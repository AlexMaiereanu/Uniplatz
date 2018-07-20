import React from 'react';
import { StackNavigator} from 'react-navigation';
import MessagesView from './messages';
import ChatView from './chat';

export default MessageNavigator = StackNavigator({
    Messages: {screen: MessagesView},
    Chat: {screen: ChatView},
}, 
{
    headerMode: 'none',
});