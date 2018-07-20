import json

# NOTES:
# - no bought posts information (buyerIds unknown)
# - creation and sold dates unknown
# - no chat has a proper ID (none of them are bound to items)
# - message timestamps are 0
# - lastMessageId is always empty

with open('backup.json') as json_data:
    data = json.load(json_data)

newData = {'users': {}, 'posts': {'active': {}, 'sold': {}}, 'chats': {}, 'messages': {}, 'feedback': {}}

DEFAULT_CREATION_DATE = 1515888000
DEFAULT_NOT_SOLD_DATE = 0
DEFAULT_SOLD_DATE = 1515888000
DEFAULT_BUYER_ID = ''
DEFAULT_JOIN_DATE = 1515888000
DEFAULT_LAST_NAME = ''
DEFAULT_POST_ID = 'POST-NOT-FOUND'
DEFAULT_SEEN = True
DEFAULT_LAST_MESSAGE_ID = ''
DEFAULT_MESSAGE_TIMESTAMP = 0
DEFAULT_MESSAGE_TYPE = 'text'
DEFAULT_KEY_SEPARATOR = '*'

def convertPost(data):
    x = {}
    x['ownerId'] = data.get('uid', '')
    x['name'] = data.get('ItemName', '')
    x['location'] = data.get('ItemPickUpLocation', '')
    x['price'] = data.get('priceBeforeSold', '')
    x['description'] = data.get('description', '')
    x['imageUrl'] = data.get('image', '')
    x['buyerId'] = DEFAULT_BUYER_ID
    x['creationDate'] = DEFAULT_CREATION_DATE
    x['soldDate'] = DEFAULT_SOLD_DATE if data['sold'] else DEFAULT_NOT_SOLD_DATE
    return x

def convertUser(data):
    x = {}
    x['email'] = data.get('email', '')
    x['firstName'] = data.get('name', '')
    x['deviceToken'] = data.get('device_token', '')
    x['lastName'] = DEFAULT_LAST_NAME
    x['joinDate'] = DEFAULT_JOIN_DATE
    return x

# save users
for userId in data['Users']:
    user = data['Users'][userId]
    # save user data
    newData['users'][userId] = convertUser(user)
    # get sold and active posts
    soldPosts = {}
    activePosts = {}
    for postId in data['Posts']:
        post = data['Posts'][postId]
        if post['uid'] == userId:
            if post['sold']:
                soldPosts[postId] = True
            else:
                activePosts[postId] = True
    newData['users'][userId]['postsActive'] = activePosts
    newData['users'][userId]['postsSold'] = soldPosts

# save posts
for postId in data['Posts']:
    post = data['Posts'][postId]
    if post['sold']:
        newData['posts']['sold'][postId] = convertPost(post)
    else:
        newData['posts']['active'][postId] = convertPost(post)

chatsByUserId = {}

# save chats
for firstId in data['Chat']:
    for secondId in data['Chat'][firstId]:
        chat = data['Chat'][firstId][secondId]
        keys = sorted([firstId, secondId])
        postId = DEFAULT_POST_ID
        # this is for finding the post id, not used anymore
        # for x in data['Posts']:
        #     if data['Posts'][x]['image'] == chat.get('item_image', ''):
        #         postId = x
        chatId = postId + DEFAULT_KEY_SEPARATOR + DEFAULT_KEY_SEPARATOR.join(keys)

        if firstId in chatsByUserId:
            chatsByUserId[firstId].append(chatId)
        else:
            chatsByUserId[firstId] = [chatId]
        if secondId in chatsByUserId:
            chatsByUserId[secondId].append(chatId)
        else:
            chatsByUserId[secondId] = [chatId]

        newChat = {}
        newChat['aliceId'] = keys[0]
        newChat['bobId'] = keys[1]
        newChat['postId'] = postId
        newChat['seen'] = DEFAULT_SEEN
        newChat['lastMessageId'] = DEFAULT_LAST_MESSAGE_ID

        newData['chats'][chatId] = newChat

# save messages
for firstId in data['Messages']:
    for secondId in data['Messages'][firstId]:
        chatId = 'NO-POST-ID' + DEFAULT_KEY_SEPARATOR + DEFAULT_KEY_SEPARATOR.join(sorted([firstId, secondId]))
        newData['messages'][chatId] = {}
        for messageId in data['Messages'][firstId][secondId]:
            msg = data['Messages'][firstId][secondId][messageId]
            message = {}
            message['receiverId'] = msg.get('receiverUid', '')
            message['senderId'] = msg.get('senderUid', '')
            message['text'] = msg.get('message', '')
            message['timestamp'] = DEFAULT_MESSAGE_TIMESTAMP
            message['type'] = DEFAULT_MESSAGE_TYPE
            message['seen'] = DEFAULT_SEEN
            newData['messages'][chatId][messageId] = message

listOfUserIdsWithoutEntry = []

# save chats for users
for userId in chatsByUserId:
    if userId in newData['users']:
        newData['users'][userId]['chats'] = {}
    else:
        listOfUserIdsWithoutEntry.append(userId)
        newData['users'][userId] = {}
        newData['users'][userId]['chats'] = {}
    for chatId in chatsByUserId[userId]:
        newData['users'][userId]['chats'][chatId] = True

print(listOfUserIdsWithoutEntry)

# save feedback
for feedbackId in data["Feedback"]:
    fb = data['Feedback'][feedbackId]
    feedback = {}
    feedback['userId'] = fb['uid']
    feedback['text'] = fb['feedback']
    feedback['timestamp'] = 0
    newData['feedback'][feedbackId] = feedback

json.dump(newData, open('out.json','w'), sort_keys=True, indent=4, separators=(',', ': '))
