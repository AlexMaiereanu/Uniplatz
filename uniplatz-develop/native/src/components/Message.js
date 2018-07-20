import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Message extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            flexDir: (this.props.isMyMessage) ? 'flex-end' : 'flex-start',
            bgColor: (this.props.isMyMessage) ? '#c62828' : '#d8d8d8',
            textColor: (this.props.isMyMessage) ? '#f9f9f9' : '#111111',
            cornerBottomRight: (this.props.isMyMessage) ? 0 : 8,
            cornerBottomLeft: (this.props.isMyMessage) ? 8 : 0,
            marginAbove: (this.props.isSimilarPrevSender) ? 5 : 18,
        }
    }
    render() {
        return(
            <View style={{margin: 15, marginTop: (this.state.marginAbove), marginBottom: 0, padding: 10, backgroundColor: (this.state.bgColor), 
                    alignSelf: (this.state.flexDir), borderRadius: 8, 
                    borderBottomRightRadius: (this.state.cornerBottomRight), 
                    borderBottomLeftRadius: (this.state.cornerBottomLeft)}}>
                <Text style={{color: (this.state.textColor)}}>
                    {this.props.text}
                </Text>
            </View>
        );
    }
}