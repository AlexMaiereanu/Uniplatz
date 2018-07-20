import { db, auth, storage } from './fire';

export default class FirebaseService {
    static currentUser() {
    /** retuns the currently logged in user */
        return auth.currentUser;
    }

    /**
   * AUTHENTICATION
   */

    static authenticatedHandler(loggedIn, notLoggedIn, notVerified) {
    /**
     * Different callback functions for different authentication states
     * Handlers:
     * 1. loggedIn: returns an AuthUser
     * 2. notVerified: returns an AuthUser
     * 3. notLoggedIn: returns nothing
     */
        auth.onAuthStateChanged(user => {
            if (!!user) {
                if (user.emailVerified) {
                    loggedIn(user);
                } else {
                    notVerified(user);
                }
            } else {
                notLoggedIn();
            }
        });
    }

    static verifyEmail(errHandler, completionHandler) {
    /** 
     * Sends verification email to the currently logged in user 
     * Handlers:
     * 1. errHandler: returns an error
     * 2. completionHandler: returns nothing
     */
        auth.currentUser.sendEmailVerification()
            .catch(error => errHandler(error))
            .then(() => completionHandler());
    }

    static logout() {
    /** 
     * Signs user out
     * Handlers:
     * - none -
     */
        auth.signOut();
    }

    static resetPassword(errHandler, completionHandler) {
    /** 
     * Sends a password reset email to the currently logged in user 
     * Handlers:
     * 1. errHandler: returns an error
     * 2. completionHandler: returns nothing
     */
        auth.sendPasswordResetEmail(auth.currentUser.email)
            .catch(errHandler)
            .then(() => completionHandler());
    }

    static updateUsername(username, errHandler, completionHandler) {
    /** 
     * Updates the displayName of the currently logged in user
     * Handlers:
     * 1. errHandler: returns an error
     * 2. completionHandler: returns nothing
     */
        /** first, update displayName in auth table */
        const profile = {
            displayName: username,
        };
        auth.currentUser.updateProfile(profile)
            .catch(errHandler)
            .then(() => {
                /** now, change username in db user table */
                db.ref(`/users/${auth.currentUser.uid}/name/displayName`).set(username, error => {
                    if (error) {
                        errHandler(error);
                    } else {
                        completionHandler();
                    }
                });
            });
    }

    static createUserAfterLogin() {
        const { currentUser } = auth;
        const name = currentUser.displayName;
        const userInfo = {
            email: currentUser.email,
            joinDate: new Date().getTime(),
            name: {
                displayName: name,
                fullName: name,
            }
        }
        db.ref(`/users/${currentUser.uid}`).once('value', userSnapshot => {
            console.log('checking user in db');
            if (!userSnapshot.val()) {
                console.log('didnt find user in db');
                db.ref(`/users/${currentUser.uid}`).set(userInfo, error => {
                    if (error) {
                        console.error(error);
                    } else {
                        console.log('created new user because didnt exist before');
                    }
                })
            }
        })
    }

    static createUser(name, email, password, errHandler, completionHandler) {
    /**
     * Create a new user (called when new user signs up)
     * Handlers:
     * 1. errHandler: returns an error
     * 2. completionHandler: returns nothing
     * TODO:
     * get device token
     */
        auth.createUserWithEmailAndPassword(`${email}@jacobs-university.de`, password)
            .catch(errHandler)
            .then(user => {
                /** user was successfully created (in auth table) */
                if (user) {
                    const { currentUser } = auth;
                    const profile = { displayName: name };
                    /** send verification email (otherwise not authenticated) */
                    currentUser.sendEmailVerification()
                        .catch(errHandler);
                    /** set username in profile */
                    currentUser.updateProfile(profile)
                        .catch(errHandler)
                        .then(() => {
                            /**
                             * auth table done
                             * create new entry in user table
                             */
                            const userInfo = {
                                email: currentUser.email,
                                joinDate: new Date().getTime(),
                                name: {
                                    fullName: name,
                                    displayName: name,
                                },
                            };
                            const userId = currentUser.uid;
                            /** upload user data into database */
                            db.ref(`/users/${userId}`).set(userInfo, error => {
                                if (error) {
                                    errHandler(error);
                                } else {
                                    completionHandler();
                                }
                            });
                        });
                }
        });
    }

    static signIn(jacobsUsername, password, errHandler, notVerified, loggedIn) {
    /** 
     * Login with jacobs username and password
     * Handlers:
     * 1. errHandler: returns an (optional) error
     * 2. notVerified: returns an AuthUser
     * 3. loggedIn: returns an AuthUser
     */
        const domain = '@jacobs-university.de';
        const email = jacobsUsername + domain;
        auth.signInWithEmailAndPassword(email, password)
            .catch(errHandler)
            .then(() => {
                if (auth.currentUser) {
                    /** login succeeded, success only if email is verified */
                    if (auth.currentUser.emailVerified) {
                        loggedIn(auth.currentUser);
                    } else {
                        notVerified(auth.currentUser);
                    }
                }
            });
    }

    /**
     * FEEDBACK
     */

    static sendFeedback(feedback, errHandler, completionHandler) {
    /**
     * Sends the feedback to the database
     * Handlers:
     * 1. errHandler: returns an error
     * 2. completionHandler: returns nothing
     */
        const tstmp = new Date().getTime();
        /** create object according to dbFeedback */
        const data = {
            text: feedback,
            timestamp: tstmp,
            userId: auth.currentUser.uid,
        };
        /** push new feedback into the database */
        db.ref('/feedback').push(data, error => {
            if (error) {
                errHandler(error);
            } else {
                completionHandler();
            }
        });
    }

    /**
     * POSTS
     */

    static uploadImage(file, errHandler, completionHandler) {
    /**
     * Upload an image to the firebase storage
     * Handlers:
     * 1. errHandler: returns an error
     * 2. completionHandler: returns the downloadURL of the image
     */
        /* create upload task */
        const uploadTask = storage.ref('Photos/').child(file.name).put(file);
        /* upload file to storage. observer - onError - onSuccess */
        uploadTask.on('state_changed', () => {}, errHandler, () => {
            /** finished uploading, return downloadURL */
            completionHandler(uploadTask.snapshot.downloadURL);
        });
    }

    static createPost(post, errHandler, completionHandler) {
    /**
     * Create a new post and put it into the database
     * Handlers:
     * 1. errHandler: returns an error
     * 2. completionHandler: returns the downloadURL of the image (string)
     */
        db.ref('/posts/active').push(post, error => {
            if (error) {
                errHandler(error);
            } else {
                completionHandler();
            }
        });
    }

    static getAllActivePosts(completionHandler) {
    /**
     * Get all active posts
     * Handlers: 
     * 1. completionHandler: returns a list of Post
     */
        db.ref('/posts/active').on('value', listSnapshot => {
            /** get the list of all active posts */
            const posts = [];
            listSnapshot.forEach(postSnapshot => {
                /** get each active post */
                const post = postSnapshot.val();
                post.postId = postSnapshot.key;
                posts.unshift(post);
            });
            /** we have iterated through the list, ready to return */
            completionHandler(posts);
        });
    }

    static getLastNPosts(number, completionHandler) {
        db.ref('/posts/active').limitToLast(number).on('value', listSnapshot => {
            /** get the list of the last number of active posts */
            const posts = [];
            listSnapshot.forEach(postSnapshot => {
                /** get each active post */
                const post = postSnapshot.val();
                post.postId = postSnapshot.key;
                posts.unshift(post);
            });
            /** we have iterated through the list, ready to return */
            completionHandler(posts);
        });
    }

    static getOwnPosts(active, errHandler, newPostHandler) {
    /**
     * Get all own posts (active or sold, depending on the argument)
     * Handlers:
     * 1. newPostHandler:   - returns one OwnPost (with post.owner of type 'dbUser'),
     *                      - returns one OwnPost list
     * 2. errHandler: returns an error?
     */
        /** newPostHandler gets one post as argument */
        const userId = auth.currentUser.uid;
        const posts = [];
        const postIds = [];
        db.ref(`/users/${userId}/posts${active ? 'Active' : 'Sold'}`).once('value', idListSnapshot => {
            /** get all post ids */
            idListSnapshot.forEach(idSnapshot => {
                postIds.unshift(idSnapshot.key);
            });
            /** we have all post ids, now fetch the posts */
            postIds.forEach(postId => {
                db.ref(`/posts/${active ? 'active' : 'sold'}/${postId}`).once('value', postSnapshot => {
                    /** create the post and then add it to the post list */
                    const post = postSnapshot.val();
                    post.postId = postId;
                    /** get the owner's name */
                    db.ref(`/users/${post.ownerId}`).once('value', ownerSnapshot => {
                        post.owner = ownerSnapshot.val();
                        posts.unshift(post);
                        /** end: call the completion handler with the new post and the list of all posts */
                        newPostHandler(post, posts);
                    });
                }, errHandler);
            });
        }, errHandler);
    }

    static markPost(post, markAsSold, errHandler, completionHandler) {
    /**
     * Mark a given post as sold/active.
     * - markAsSold: if true, mark this post as sold now.
     * Handlers: 
     * 1. errHandler: returns an error
     * 2. completionHandler: returns nothing
     */
        /** get data about post */
        const { postId } = post;
        const postData = post;
        /** make sure we're not pushing the entire owner object, only ownerId */
        postData.owner = null;
        const updates = {};
        /** move the post id in the user table */
        updates[`/users/${post.ownerId}/posts${markAsSold ? 'Active' : 'Sold'}/${postId}`] = null;
        updates[`/users/${post.ownerId}/posts${markAsSold ? 'Sold' : 'Active'}/${postId}`] = true;
        /** move the post object in the post table */
        updates[`/posts/${markAsSold ? 'active' : 'sold'}/${postId}`] = null;
        updates[`/posts/${markAsSold ? 'sold' : 'active'}/${postId}`] = postData;
        /** push the updates to the database */
        db.ref().update(updates)
            .catch(errHandler)
            .then(completionHandler);
    }

    /**
     * CHATS
     */

    static getOwnChats(newChatHandler) {
    /**
     * Gets all of the users chats
     * Handlers: 
     * 1. errHandler: returns an error
     * 2. newChatHandler: returns a new chat of type ''
     */
        const userId = auth.currentUser.uid;
        db.ref('/chats').on('child_added', chatSnapshot => {
            /** observe new children in the chats */
            const chatId = chatSnapshot.key;
            if (chatId.indexOf(userId) !== -1) {
                /** if the userId is in the chatId, then this is a chat for the current user */
                const chat = chatSnapshot.val();
                chat.chatId = chatSnapshot.key;
                const partnerId = (chat.aliceId === userId) ? chat.bobId : chat.aliceId;
                /** we have the basic chat object, now get the partner user */
                db.ref(`/users/${partnerId}`).once('value', partnerSnapshot => {
                    /** get the partner user */
                    if (partnerSnapshot.val()) {
                        chat.partner = partnerSnapshot.val();
                        chat.partnerId = partnerSnapshot.key;
                    } else {
                        /** default partner user name */
                        chat.partner = { 
                            name: {
                                displayName: 'Uniplatz User',
                                fullName: 'Uniplatz User',
                            },
                            email: 'xxxxxx@jacobs-university.de',
                        };
                    }
                    /** we have the partner, now get the post data */
                    if (chat.postId && chat.postId !== 'POST-NOT-FOUND') {
                        /** if we have a valid post id, fetch the post from the db */
                        db.ref(`/posts/active/${chat.postId}`).on('value', postSnapshot => {
                            /** if we can't find the post among the active ones, look at the sold ones */
                            if (postSnapshot.val()) {
                                chat.post = postSnapshot.val();
                                newChatHandler(chat);
                            } else {
                                db.ref(`/posts/sold/${chat.postId}`).on('value', postSnapshot => {
                                    /** if we can't find the post here either, set a placeholder */
                                    if (postSnapshot.val()) {
                                        chat.post = postSnapshot.val();
                                        newChatHandler(chat);
                                    } else {
                                        chat.post = {
                                            name: 'Post not found',
                                            location: 'Post not found',
                                            price: 0.0,
                                            description: 'Post not found',
                                            imageUrl: '',
                                        };
                                        newChatHandler(chat);
                                    }
                                });
                            }
                        });
                    } else {
                        /** if we have no valid postId, then set a placeholder */
                        chat.post = {
                            name: 'Post not found',
                            location: 'Post not found',
                            price: 0.0,
                            description: 'Post not found',
                            imageUrl: '',
                        };
                        newChatHandler(chat);
                    }
                });
            }
        });
    }

    static getMessagesInChat(chat, completionHandler, errHandler) {
    /**
     * Get the 20 most recent messages - updates automatically
     * Handlers:
     * 1. completionHandler: returns a Message
     */
    /** gets the 20 most recent messages - updates automatically */
        const chatId = chat.chatId;
        db.ref(`/messages/${chatId}`).limitToLast(20).on('child_added', messageSnapshot => {
            const msg = messageSnapshot.val();
            msg.messageId = messageSnapshot.key;
            msg.sentByMe = (msg.senderId === auth.currentUser.uid);
            completionHandler(msg);
        }, errHandler);
    }

    static getNumberOfNewMessages(errHandler, completionHandler) {
    /**
     * Get the count of new messages - updates automatically
     * Handlers:
     * 1. errHandler: returns an error
     * 2. completionHandler: returns a number
     */
        const userId = auth.currentUser.uid;
        db.ref(`/chats/`).on('value', chatsSnapshot => {
            /** get all chats */
            let count = 0;
            chatsSnapshot.forEach(chatSnapshot => {
                if (chatSnapshot.key.indexOf(userId) !== -1) {
                    /** this is a chat for this user */
                    if (chatSnapshot.val()) {
                        if (!chatSnapshot.val().seen && chatSnapshot.val().lastMessage.senderId !== userId) {
                            count += 1;
                        }
                    }
                }
            });
            completionHandler(count);
        }, error => {
            if (error) {
                errHandler(error);
            }
        });
    }

    static markChatSeen(chat, errHandler, completionHandler) {
    /** 
     * Mark the current chat as seen
     * Handlers:
     * 1. errHandler: returns an error
     * 2. newChatHandler: returns nothing
     */
        const chatId = chat.chatId;
        db.ref(`/chats/${chatId}`).update({ seen: true }, error => {
            if (error) {
                errHandler(error);
            } else {
                completionHandler();
            }
        })
    }

    static sendMessage(text, receiverId, postId, errHandler, completionHandler) {
    /**
     * Send a message
     * Handlers: 
     * 1. errHandler: returns an error
     * 2. completionHandler: returns nothing
     */
        /** get data for the message */
        const tstmp = Date.now();
        const sortedUids = [receiverId, auth.currentUser.uid].sort((a, b) => a.localeCompare(b));
        let chatId = `${postId}*${sortedUids[0]}*${sortedUids[1]}`;
        const message = {
            receiverId,
            senderId: auth.currentUser.uid,
            text,
            timestamp: tstmp,
            type: 'text',
        };
        db.ref(`/messages/${chatId}`).push(message, messageError => {
            if (messageError) {
                /** if there's an error -> handle it */
                errHandler(messageError);
            } else {
                /** message in db, now update chat */
                completionHandler();
            }
        });
    }

    static sendPostRequest(postName, receiverId, postId, errHandler, completionHandler) {
        const message = `Hi there! I'm interested in the '${postName}' you're offering.`;
        this.sendMessage(message, receiverId, postId, errHandler, completionHandler);
    }
}
