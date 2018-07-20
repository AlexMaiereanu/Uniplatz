import React, { Component } from 'react';
import { Modal, StyleSheet, Image, View, ScrollView } from 'react-native';
import { Header, Card, Text, Button } from 'react-native-elements';
import { Screen, Subtitle, Caption, Heading } from '@shoutem/ui';

export default class BuyModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                visible
                animationType="slide">
                <Screen>
                    <Header
                        statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e0000' }}
                        rightComponent={{
                            icon: 'cancel', color: '#ffffff', underlayColor: '#c62828', onPress: () => this.props.onClose(),
                        }}
                        centerComponent={{ text: 'PRODUCT DETAIL', style: { color: '#ffffff' } }}
                        outerContainerStyles={{ backgroundColor: '#c62828' }}
                    />
                    <ScrollView>
                        <Image
                            style={{
                                marginLeft: 20, marginRight: 20, marginTop: 20, height: 300,
                            }}
                            source={{ uri: this.props.post.imageUrl }}
                        />
                        <Card title={this.props.post.name}>
                            <Text>
                                <Text style={{ fontWeight: 'bold' }}>Price:</Text> {this.props.post.price}€ {'\n\n'}
                                <Text style={{ fontWeight: 'bold' }}>Location:</Text> {this.props.post.location} {'\n\n'}
                                <Text style={{ fontWeight: 'bold' }}>Description: </Text>
                                <Text>{this.props.post.description}</Text> {'\n'}
                            </Text>
                            <Button
                                icon={{ name: 'send' }}
                                title="REQUEST"
                                backgroundColor="#c62828"
                                onPress={() => {
                                    this.props.onBuy();
                                    this.props.onClose();
                                }} />
                        </Card>
                    </ScrollView>
                </Screen>
            </Modal>
        );
    }
}
