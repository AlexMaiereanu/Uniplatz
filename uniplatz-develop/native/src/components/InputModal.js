import React, { Component } from 'react';
import { Modal, StatusBar } from 'react-native';
import { Header } from 'react-native-elements';
import { Title, Tile, Button, Text, View, Icon, TextInput } from '@shoutem/ui';

export default class InputModal extends Component {
    constructor(props) {
        super(props);
        this.text = '';
    }

    render() {
        return (
            <Modal
                visible
                animationType="slide"
                onRequestClose={this.props.onClose}
            >
                <StatusBar barStyle='default'/>
                <Tile styleName="text-centric">
                    <Title styleName="md-gutter-bottom">{this.props.title}</Title>
                    <TextInput
                        placeholder={this.props.placeholder}
                        multiline={this.props.multiline}
                        style={this.props.style}
                        numberOfLines={5}
                        onChangeText={text => this.text = text}
                        textAlign="center"
                        style={{ width: 300 }}
                    />
                    <View styleName="horizontal">
                        <Button
                            styleName="confirmation"
                            onPress={() => {
                                this.props.onSave(this.text);
                                this.props.onClose();
                            }}
                        >
                            <Icon name="checkbox-on" />
                            <Text>Save</Text>
                        </Button>
                        <Button styleName="confirmation dark" onPress={this.props.onClose}>
                            <Icon name="close" />
                            <Text>Cancel</Text>
                        </Button>
                    </View>
                </Tile>
            </Modal>
        );
    }
}
