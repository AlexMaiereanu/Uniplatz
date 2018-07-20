# Jacobs Store 

## Git rules

- Never push to `develop` branch without a code review.
- Work on `feature/..` branches.
- Push only production ready commits to `master` branch.

## How to run

1. Install Node.js [here](https://nodejs.org/en/).
2. Run `npm install -g create-react-app`.
3. Run `npm install` in the project folder to install dependencies.
4. To run the project in your browser, run `npm start`.

## How to deploy

- Install `firebase tools` as described below.
- To deploy the website, run `firebase deploy --only website`.
- To deploy cloud functions, run `firebase deploy --only functions`.

## Learning Resources

- JavaScript tutorial [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript).
- Know about `arrow functions`, `classes`, `template literals`, `let` and `const` statements. Lookup [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)
- RTFM [here](https://reactjs.org/docs/).
- React Tutorial [here](https://reactjs.org/tutorial/tutorial.html).

## Installed `npm` Packages

- Firebase tools `npm install -g firebase-tools`
- Routing `npm install --save react-router-dom`.
- Firebase `npm i firebase --save`.
- Semantic UI `yarn add semantic-ui-react`
- Semantic UI stylesheet in `index.html`.

## Database Scheme

The database currently looks like this:
```JavaScript
{
    users: {
        userId: {
            email: '',
            firstName: '',
            lastName: '',
            joinDate: '',
            deviceToken: '',
            postsActive: {
              postId: true
            },
            postsSold: {},
            postsBought: {},
            chats: {
              chatId: true
            }
        }
    },
    posts: {
        active: {
            postId: {
                ownerId: '',
                buyerId: '',
                name: '',
                location: '',
                price: 0.0,
                description: '',
                imageUrl: '',
                creationDate: 0,
                soldDate: 0
            }
        },
        sold: {
            postId: {
                ownerId: '',
                buyerId: '',
                title: '',
                location: '',
                price: 0.0,
                description: '',
                imageUrl: '',
                creationDate: 0,
                soldDate: 0
            }
        }
    },
    chats: {
        chatId: {
            aliceId: '',
            bobId: '',
            postId: '',
            lastMessageId: '',
            seen : false
        }
    },
    messages: {
        chatId: {
            messageId: {
                receiverId: '',
                senderId: '',
                timestamp: '',
                text: '',
                type: '',
                seen: true
            }
        }
    },
    feedback: {
        feedbackId: {
            userId: '',
            text: '',
            timestamp: ''
        }
    }
}
```