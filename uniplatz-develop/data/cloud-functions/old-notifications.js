// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

'use strict'

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotification = functions.database.ref('/Notifications/{user_id}/{notification_id}')
    .onWrite(event => {

        const user_id = event.params.user_id;
        const notification_id = event.params.notification_id;

        console.log("We have a notification to send to : ", user_id);

        console.log("The notification id is: ", notification_id);

        if(!event.data.val()){

            return console.log('A notification has been deleted from the database: ', notification_id);
        }

        const buyerId = admin.database().ref(`/Notifications/${user_id}/${notification_id}/from`).once('value');
        return buyerId.then(buyerIdResult => {

                const buyer_id = buyerIdResult.val();

                console.log('You have a new notification from : ', user_id);

                console.log("The notification id is: ", notification_id);

                console.log('The buyer id is : ', buyer_id);

                const userQuery = admin.database().ref(`Users/${buyer_id}/name`).once('value');
                return userQuery.then(userResult => {

                    const userName = userResult.val();

                    const postKey = admin.database().ref(`/Notifications/${user_id}/${notification_id}/post_id`).once('value');
                    return postKey.then(postKeyResult => {

                        const post_key = postKeyResult.val();

                        const itemName = admin.database().ref(`/Posts/${post_key}/ItemName`).once('value');
                        return itemName.then(itemNameResult => {

                            const item_name = itemNameResult.val();

                            const itemImage = admin.database().ref(`/Posts/${post_key}/image`).once('value');
                            return itemImage.then(itemImageResult => {

                                const item_image = itemImageResult.val();

                                const deviceToken = admin.database().ref(`/Users/${user_id}/device_token`).once('value');
                                return deviceToken.then(result => {

                                    const token_id = result.val();

                                    console.log("Device token is: ", token_id);

                                    const payload = {
                                        data: {
                                            "buyer_name" : `${userName}`,
                                            "buyer_id" : `${buyer_id}`,
                                            "item_name" : `${item_name}`,
                                            "item_image" : `${item_image}`
                                        }
                                    };


                                    return admin.messaging().sendToDevice(token_id, payload).then(response => {

                                        console.log('This was the notification feature');

                                    });

                            });

                            });

                        });


                    });


                    });


            });

});






exports.sendMessageNotification = functions.database.ref('/MessageNotifications/Notifications/{user_id}/{notification_id}')
        .onWrite(event => {

        const user_id = event.params.user_id;
const notification_id = event.params.notification_id;

console.log("We have a notification to send to : ", user_id);

console.log("The notification id is: ", notification_id);

if(!event.data.val()){

    return console.log('A notification has been deleted from the database: ', notification_id);
}

const senderId = admin.database().ref(`/MessageNotifications/${user_id}/${notification_id}/from`).once('value');
return senderId.then(senderIdResult => {

        const sender_id = senderIdResult.val();

        console.log('You have a new notification from : ', user_id);

        console.log("The notification id is: ", notification_id);

        console.log('The sender id is : ', sender_id);

        const userQuery = admin.database().ref(`Users/${sender_id}/name`).once('value');
        return userQuery.then(userResult => {

                const userName = userResult.val();

                console.log('Sender name is : ', userName);

                const lastMessage = admin.database().ref(`/Chat/${user_id}/${sender_id}/last_message`).once('value');
                return lastMessage.then(lastMessageResult => {

                        const last_message = lastMessageResult.val();

                        console.log("The last message is: ", last_message);

                        const itemImage = admin.database().ref(`/Chat/${user_id}/${sender_id}/item_image`).once('value');
                        return itemImage.then(itemImageResult => {

                                const item_image = itemImageResult.val();

                                const deviceToken = admin.database().ref(`/Users/${user_id}/device_token`).once('value');

                                return deviceToken.then(result => {

                                        const token_id = result.val();

                                        console.log("Device token is: ", token_id);

                                        const payload = {
                                            data: {
                                                "sender_name" : `${userName}`,
                                                "sender_id" : `${sender_id}`,
                                                "last_message" : `${last_message}`,
                                                "item_image" : `${item_image}`
                                            }
                                        };


                                        return admin.messaging().sendToDevice(token_id, payload).then(response => {

                                                console.log('This was the notification feature');

                                        });

                                });

                        });

                    });

                });


        });

});



