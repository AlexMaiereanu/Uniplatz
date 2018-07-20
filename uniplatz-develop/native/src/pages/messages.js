import React, { Component } from 'react';
import { Screen } from '@shoutem/ui';
import { ScrollView, Text, View } from 'react-native';
import { ListItem, List, Header } from 'react-native-elements';
import LoadingView from '../components/LoadingView';
import FirebaseService from '../services/firebaseService';

export default class MessagesView extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            chats: [],
        };
    }

    componentWillMount() {
        FirebaseService.getOwnChats(newChat => {
            this.setState(prev => {
                prev.chats.push(newChat);
                return prev;
            });
        });
    }

    render() {
        return (
            <Screen>
                <Header
                    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#c62828'}}
                    centerComponent={{ text: 'MESSAGES', style: {color: '#ffffff'} }}
                    outerContainerStyles={{ backgroundColor: '#c62828' }}
                />
                {
                    (this.state.loading)
                        ? <LoadingView text="LOADING MESSAGES.." />
                        :
                        (
                            (this.state.chats.length > 0)
                                ? <ScrollView>
                                    <List containerStyle={{marginTop: -1}}>
                                        {
                                            this.state.chats.map(chat => (
                                                <ListItem
                                                    key={chat.chatId}
                                                    title={chat.partner.name.displayName}
                                                    subtitle={chat.post.name}
                                                    onPress={() => this.props.navigation.navigate('Chat', { chat })}
                                                />
                                            ))
                                        }
                                    </List>
                                </ScrollView>
                                :
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text> Sorry, you have no messages </Text>
                                </View>
                        )
                }
            </Screen>
        );
    }
}
