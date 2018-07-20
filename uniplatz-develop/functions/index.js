const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const database = admin.database;

/**
 * OVERVIEW:
 * - User signs up -> create user in user table
 * - Message is sent -> update the chat field
 * - Chat created -> update user table with new chat
 * - Post created (sold/active) -> update user table with new post
 * - Post (re)moved -> (re)move from user table
 * - Message is sent -> send a push notification
 */

/* when user initially signs up */
exports.createUserInDatabase = functions.auth.user().onCreate(event => {
    /*  put user object into the database after signing up. */
    const user = event.data.val();
    const email = user.email;
    const userId = user.uid;
    /* at this point, the user only has an id and an email. rest will be added manually. */
    /* set up the fields to be updated */
    const updates = {};
    updates[`/users/${userId}/email`] = email;
    updates[`/users/${userId}/joinDate`] = new Date().getTime();
    /* return promise of the database operation */
    console.log(`Create user with email: ${email}.`);
    return database().ref().update(updates, error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Successfully created user.');
        }
    });
});

/** when a message is sent, update/create the chat table */
exports.onMessageSent = functions.database.ref('/messages/{chatId}/{messageId}').onCreate(event => {
    /* put message into chat's last message */
    const chatId = event.params.chatId;
    const messageId = event.params.messageId;
    const message = event.data.val();
    const userIds = [message.receiverId, message.senderId].sort();
    /* get necessary data for chat object */
    const aliceId = userIds[0];
    const bobId = userIds[1];
    const postId = chatId.split('*')[0];
    /* create a message object */
    const msg = {
        messageId: messageId,
        type: message.type,
        text: message.text,
        timestamp: message.timestamp,
        receiverId: message.receiverId,
        senderId: message.senderId,
    };
    /* create the chat object (with the message object) */
    const chat = {
        aliceId: aliceId,
        bobId: bobId,
        postId: postId,
        lastMessage: msg,
        seen : false
    };
    /* write chat object into database */
    console.log('Updating/creating chat field after message was sent.');
    return database().ref(`/chats/${chatId}`).set(chat, error => {
        if (error) {
            console.error(error.message);
        } else {
            console.log('Success. Updated/created chat field.')
        }
    });
})

exports.onChatCreated = functions.database.ref('/chats/{chatId}').onCreate(event => {
    /* get chat information */
    const chatId = event.params.chatId;
    const chat = event.data.val();
    const aliceId = chat.aliceId;
    const bobId = chat.bobId;
    /* set up the fields to be updated */
    const updates = {};
    updates[`/users/${aliceId}/chats/${chatId}`] = true;
    updates[`/users/${bobId}/chats/${chatId}`] = true;
    /* execute the updates */
    console.log('Updating user table after chat was created.');
    return database().ref().update(updates, error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Success. Updated user chat fields.');
        }
    });
});

/* when active post is created */
exports.onPostCreated = functions.database.ref('/posts/active/{postId}').onCreate(event => {
    /* used to put the post into various locations, where it's needed. */
    const post = event.data.val();
    const postId = event.params.postId;
    const ownerId = post.ownerId;
    /* set up the fields to be updated */
    const updates = {};
    updates[`/users/${ownerId}/postsActive/${postId}`] = true;
    /* if buyer id is specified, remove this post from the buyer's bought post */
    if (post.buyerId) {
        updates[`/users/${post.buyerId}/postsBought/${postId}`] = null;
    }
    /* return promise of the database operation */
    console.log('Updating user table with new active post.');
    return database().ref().update(updates, error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Success. Updated user table with new active post.');
        }
    });
});

/* when post is marked as sold */
exports.onSoldPost = functions.database.ref('/posts/sold/{postId}').onCreate(event => {
    /* used to put the post into various locations, where it's needed. */
    const post = event.data.val();
    const postId = event.params.postId;
    const ownerId = post.ownerId;
    const buyerId = post.buyerId;
    /* we need to update data in buyer and owner */
    var updates = {};
    /* add reference in sold posts */
    updates[`/users/${ownerId}/postsSold/${postId}`] = true;
    /* if buyer is specified, add post to bought */
    if (buyerId) {
        updates[`/users/${buyerId}/postsBought/${postId}`] = true;
    }
    /* return promise of the database operation */
    console.log('Updating user table with post that got sold.');
    return database().ref().update(updates, error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Success. Updated user table with post that got sold.')
        }
    });
});

/* when active post is removed (or moved) */
exports.onActivePostRemoved = functions.database.ref('posts/active/{postId}').onDelete(event => {
    /* used to remove a post's references */
    const post = event.data.previous.val()
    const postId = event.params.postId;
    const ownerId = post.ownerId;
    /* return promise of database operation */
    console.log('Removing post that was deleted from active posts.');
    return database().ref(`/users/${ownerId}/postsActive/${postId}`).remove(error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Success. Updated removed active post.');
        }
    });
});


/* when sold post is removed (or moved) */
exports.onSoldPostRemoved = functions.database.ref('posts/sold/{postId}').onDelete(event => {
    /* used to remove a post's references */
    const post = event.data.previous.val()
    const postId = event.params.postId;
    const ownerId = post.ownerId;
    /* return promise of database operation */
    console.log('Removing post that was deleted from sold posts.');
    return database().ref(`/users/${ownerId}/postsSold/${postId}`).remove(error => {
        if (error) {
            console.error(error);
        } else {
            console.log('Success. Updated removed sold post.');
        }
    })
});

/**
 * FIREBASE NOTIFICATIONS
 */

exports.onNewMessageForNotification = functions.database.ref('/messages/{chatId}/{messageId}').onCreate(event => {
    /* get data */
    const chatId = event.params.chatId;
    const messageId = event.params.messageId;
    const message = event.data.val();
    /* log */
    console.log('Sending push notification..');
    /* query the user table to get the receiver's device token */
    return database().ref(`/users/${message.receiverId}`).once('value', receiverSnapshot => {
        const receiver = receiverSnapshot.val();
        if (receiver) {
            /* save the userId and the device token */
            receiver.userId = receiverSnapshot.key;
            const deviceToken = receiver.deviceToken;
            if (deviceToken) {
                /* we have the device token, prepare the payload */
                const payload = {
                    data: {
                        'senderName': receiver.name.displayName,
                        'senderId': receiver.userId,
                        'message': message.text,
                        'postName': 'not implemented atm',
                    },
                };
                /* send the notification */
                return admin.messaging().sendToDevice(deviceToken, payload)
                    .catch(error => console.log(error));
            } else {
                console.error('Failed to get the device token for the receiver.');
            }
        } else {
            console.error('Failed to get receiver from user table.');
        }
    });
});