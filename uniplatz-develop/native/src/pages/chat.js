import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';
import { Screen } from '@shoutem/ui';
import { List, Header } from 'react-native-elements';
import Message from '../components/Message';
import FirebaseService from '../services/firebaseService';

export default class ChatView extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            inputColor: '#d1d1d1',
            inputStyle: 'italic',
            myMessage: '',
            inputHeight: 0,
            messages: [],
        };
    }

    componentWillMount() {
        const { chat } = this.props.navigation.state.params;
        FirebaseService.getMessagesInChat(chat, (msg) => {
            this.setState(prev => {
                /** most recent message is on top now */
                prev.messages.unshift(msg);
                return prev;
            });
        });
    }

    componentWillUnmount() {
        this.state = {
            loading: false,
            inputColor: '#d1d1d1',
            inputStyle: 'italic',
            messages: [],
        };
    }

    onSendingMessage() {
        if (this.state.myMessage.length > 0) {
            Keyboard.dismiss();

            const { chat } = this.props.navigation.state.params;
            const receiverId = (chat.aliceId === FirebaseService.currentUser().uid) ? chat.bobId : chat.aliceId;
            FirebaseService.sendMessage(this.state.myMessage, receiverId, chat.postId, err => console.error(err), () => {});

            this.state.myMessage = ''; // Remove the current message once sent
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <Screen>
                <Header
                    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e0000' }}
                    centerComponent={{ text: 'YOUR REQUEST', style: { color: '#ffffff' } }}
                    outerContainerStyles={{ backgroundColor: '#c62828' }}
                    leftComponent={{
                        icon: 'arrow-back', color: '#ffffff', underlayColor: '#c62828', onPress: () => goBack(),
                    }}
                />
                <ScrollView>
                    <List containerStyle={{
                        backgroundColor: 'transparent', borderTopWidth: 0, marginBottom: 10, marginTop: 5,
                    }}>
                        {
                            this.state.messages.map(message => (
                                <Message
                                    key={message.messageId + new Date().getMilliseconds() + (Math.random() * 10000) + new Date().getTime()}
                                    text={message.text}
                                    isMyMessage={message.sentByMe}
                                    isSimilarPrevSender={this.state.messages[
                                        this.state.messages.indexOf(message) - (this.state.messages.indexOf(message) === 0 ? 0 : 1
                                        )].senderId === message.senderId}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
                <KeyboardAvoidingView behavior="padding">
                    <View style={{
                        height: Math.max(40, this.state.inputHeight + 10), backgroundColor: 'white', padding: 5, flexDirection: 'row',
                    }}>
                        <View style={{
                            backgroundColor: '#f9f9f9',
                            height: Math.max(30, this.state.inputHeight),
                            borderRadius: 5,
                            padding: 5,
                            borderWidth: 1,
                            borderColor: '#d1d1d1',
                            flex: 1,
                        }}>
                            <TextInput
                                style={{ color: (this.state.inputColor), fontStyle: (this.state.inputStyle) }}
                                value={this.state.myMessage}
                                placeholder="Please enter your message here..."
                                selectionColor="#b2b2b2"
                                onChangeText={(textInput) =>
                                    this.setState({ inputColor: '#111111', inputStyle: 'normal', myMessage: (textInput) },
                                    )}
                                onContentSizeChange={(event) => {
                                    this.setState({ inputHeight: event.nativeEvent.contentSize.height + 10 });
                                }}
                                returnKeyType="default"
                                enablesReturnKeyAutomatically
                                multiline />
                        </View>
                        <View style={{
                            height: 30, width: 50, backgroundColor: '#c62828', borderRadius: 5, marginLeft: 5, padding: 7,
                        }}>
                            <TouchableOpacity onPress={this.onSendingMessage.bind(this)}>
                                <Text style={{
                                    color: '#f9f9f9', alignSelf: 'center', position: 'relative', fontWeight: 'bold',
                                }}>
                                    Send
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Screen>
        );
    }
}
