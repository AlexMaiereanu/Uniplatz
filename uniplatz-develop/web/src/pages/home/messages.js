import React, { Component } from 'react';
import { Grid, Form, Item } from 'semantic-ui-react';
import ChatCard from '../../components/ChatCard/index';
import MessageCard from '../../components/MessageCard/index';
import './messages.css';
import FirebaseService from '../../services/firebaseService';

class MessagesSection extends Component {
    static formatTime(unixTimestamp) {
        // TODO: Fix the time
        const date = new Date(unixTimestamp);
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const day = weekdays[date.getDay()];
        const hours = date.getHours();
        const min = date.getMinutes();
        const time = `${day} ${hours < 10 ? '0' : ''}${hours}:${min < 10 ? '0' : ''}${min}`;
        return time;
    }

    constructor(props) {
        super(props);
        this.state = {
            chats: [],
            messagesForChat: {},
            newMessage: '',
            clickedItemId: -1,
            hasBeenClicked: [],
        };
        /** bind methods */
        this.handleChatClick = this.handleChatClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        /** load own chats */
        FirebaseService.getOwnChats(newChat => {
            this.setState(prev => {
                const state = prev;
                state.chats.push(newChat);
                return state;
            });
        });
    }

    handleChange(e, { name, value }) {
        this.setState(prevState => {
            const newState = prevState;
            newState[name] = value;
            return newState;
        });
    }

    handleSubmit() {
        if (this.state.clickedItemId !== -1
            && this.state.newMessage.length > 0) {
            FirebaseService.sendMessage(this.state.newMessage,
                this.state.chats[this.state.clickedItemId].partnerId,
                this.state.chats[this.state.clickedItemId].postId,
                (errorMessage) => {
                    console.error(errorMessage);
                },
                () => {
                    this.setState({ newMessage: '' });
                });
        }
    }

    handleChatClick(e, i) {
        e.preventDefault();

        if (!this.state.chats[i].lastMessage.sentByMe) {
            FirebaseService.markChatSeen(this.state.chats[i], error => {
                console.error(error.message);
            }, () => {
                this.setState(prev => {
                    const state = prev;
                    state.chats[i].seen = true;
                    return state;
                });
            });
        }

        this.setState(prevState => {
            const newState = prevState;
            newState.clickedItemId = i;
            return newState;
        }, () => {
            if (this.state.hasBeenClicked.indexOf(i) === -1) {
                FirebaseService.getMessagesInChat(this.state.chats[i], newMessage => {
                    this.setState(prev => {
                        const state = prev;
                        if (!state.messagesForChat[i]) {
                            state.messagesForChat[i] = [];
                        }
                        state.messagesForChat[i].push(newMessage);
                        return state;
                    });
                });
                this.setState(prev => {
                    const state = prev;
                    state.hasBeenClicked.push(i);
                    return state;
                });
            }
        });
    }

    populateBuyersChat() {
        const chatData = [];
        const { chats } = this.state;
        chats.sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);
        chats.forEach((chat, i) => {
            chatData.push(
                <Grid.Column key={i} onClick={(e) => this.handleChatClick(e, i)}>
                    <ChatCard
                        key={i}
                        oddeven={i % 2 ? 'odd' : 'even'}
                        active={(i === this.state.clickedItemId) ? 'active' : ''}
                        title={chat.post.name}
                        time={`${this.constructor.formatTime(chat.lastMessage.timestamp)}`}
                        imageUrl={chat.post.imageUrl}
                        partnerName={chat.partner.name.displayName}
                        lastMessage={chat.lastMessage.text}
                        seen={chat.seen}
                        sentByMe={chat.lastMessage.senderId === FirebaseService.currentUser().uid}
                    />
                </Grid.Column>,
            );
        });
        return chatData;
    }

    populateMessages() {
        const messagesData = [];
        const myName = FirebaseService.currentUser().displayName;
        const messages = this.state.messagesForChat[this.state.clickedItemId];
        if (!messages) {
            return [];
        }
        messages.sort((a, b) => a.timestamp - b.timestamp);
        messages.forEach((message, i) => {
            const messageName = message.sentByMe ? myName : this.state.chats[this.state.clickedItemId].partner.name.displayName;
            messagesData.push(
                <MessageCard
                    key={i}
                    name={messageName}
                    message={message.text}
                    sentByMe={message.sentByMe}
                    time={this.constructor.formatTime(message.timestamp)}
                />,
            );
        });
        return messagesData.reverse();
    }

    render() {
        const { newMessage } = this.state;

        return (
            <div className="message-screen-container">
                <div className="chat-container">
                    <Grid columns="1">
                        { this.populateBuyersChat() }
                    </Grid>
                </div>
                <div className="right-side-container">
                    {
                        /** only show the message input when a chat is active */
                        (this.state.clickedItemId === -1)
                            ? null
                            :
                            <div className="input-area">
                                <Form>
                                    <div className="chat-input">
                                        <Form.Input
                                            type="text"
                                            name="newMessage"
                                            value={newMessage}
                                            placeholder="Write a message..."
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="chat-button">
                                        <Form.Button onClick={this.handleSubmit}>Send</Form.Button>
                                    </div>
                                </Form>
                            </div>
                    }
                    <div className="messages-container" id="messageList">
                        { this.populateMessages() }
                    </div>
                </div>
            </div>
        );
    }
}


export default MessagesSection;
