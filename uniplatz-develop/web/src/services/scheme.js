/**
 * These are the objects as you get them back from the FirebaseService
 */

const AuthUser = {
    email,
    displayName,
    emailVerified, 
    photoUrl,
    uid,
};

const Post = {
    postId,
    /* everything below same as dbPost */
    ownerId, 
    buyerId, // optional
    name, 
    location,
    price, 
    description, 
    imageUrl, 
    creationDate, 
    soldDate, // optional
}

const ownPost = {
    postId,
    owner: {
        dbUser,
    },
    /* everything below same as dbPost */
    ownerId, 
    buyerId, // optional
    name, 
    location,
    price, 
    description, 
    imageUrl, 
    creationDate, 
    soldDate, // optional
}

const ownChat = {
    post: {
        dbPost,
        /**
         * if the post is not found, this is the default data:
         *  name: 'Post not found',
         *  location: 'Post not found',
         *  price: 0.0,
         *  description: 'Post not found',
         *  imageUrl: '',
         */
    },
    partner: {
        /**
         * if the user is not found, this is the default data:
         *  name: {
         *      displayName: 'Uniplatz User',
         *      fullName: 'Uniplatz User',
         *  },
         *  email: 'xxxxxx@jacobs-university.de',
         */
        dbUser,
    },
    /* everything below same as dbChat */
    aliceId,
    bobId,
    postId,
    lastMessage: {
        dbMessage,
    },
    seen,
}

const Message = {
    messageId,
    sentByMe,
    /** everything below same as dbMessage */
    receiverId,
    senderId,
    timestamp,
    text,
    type,
}

const Chat = {
    aliceId,
    bobId,
    lastMessage: {

    },
    seen,
}

/** 
 * This is the database scheme of the real-time database on firebase
 * */
const scheme = {
    users: {
        _userId: {
            dbUser,
        },
    },
    posts: {
        active : {
            _postId: {
                dbPost,
            },
        },
        sold: {
            _postId: {
                dbPost,
            },
        },
    },
    chats: {
        _chatId: {
            dbChat,
        },
    },
    messages: {
        _chatId: {
            _messageId: {
                dbMessage,
            },
        },
    },
    feedback: {
        _feedbackId: {
            dbFeedback,
        },
    },
};

/**
 * These are the separate objects with their respective properties 
 * from the realtime database on firebase
 */

const dbChat = {
    aliceId: '',
    bobId: '',
    postId: '',
    lastMessage: {
        dbMessage,
    },
    seen: false,
}

const dbFeedback = {
    userId: '',
    text: '',
    timestamp: '',
}

const dbMessage = {
    receiverId: '',
    senderId: '',
    timestamp: '',
    text: '',
    type: '',
}

const dbPost = {
    ownerId: '',
    buyerId: '?',
    name: '',
    location: '',
    price: 0.0,
    description: '',
    imageUrl: '',
    creationDate: 0,
    soldDate: 0,
}

const dbUser = {
    email: '',
    name: {
        fullName: '',
        displayName: '',
    },
    joinDate: 0,
    deviceToken: '',
    chats: {
        _chatId: true,
    },
    postsActive: {
        _postId: true,
    },
    postsBought: {
        _postId: true,
    },
    postsSold: {
        _postId: true,
    },
}