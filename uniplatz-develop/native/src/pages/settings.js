import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Screen, View } from '@shoutem/ui';
import { List, ListItem, Header } from 'react-native-elements';
import InputModal from '../components/InputModal';
import FirebaseService from '../services/firebaseService';

export default class SettingsView extends Component {
    static changePassword() {
        Alert.alert('Changing Password',
            'Are you sure you want to change your password?\nWe will send you a link to reset your password to your Jacobs email address.',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        FirebaseService.resetPassword(err => {
                            /** error */
                            if (err) {
                                console.error(err);
                            }
                        }, () => {
                            /** success */
                        });
                    },
                },
                { text: 'No', onPress: null },
            ],
        );
    }

    static updateUsername(username) {
        FirebaseService.updateUsername(username, err => {
            if (err) {
                console.error(err);
            }
        }, () => {});
    }

    static sendFeedback(feedback) {
        FirebaseService.sendFeedback(feedback, err => {
            if (err) {
                console.error(err);
            }
        }, () => {});
    }

    static logout() {
        Alert.alert('Log out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Yes',
                    onPress: () => FirebaseService.logout(),
                },
                { text: 'No', onPress: null },
            ],
        );
    }

    constructor() {
        super();
        this.state = {
            usernameOverlay: false,
            feedback: false,
        };
        this.newUsername = '';
        this.feedback = '';
        this.changeUsername = this.changeUsername.bind(this);
        this.giveFeedback = this.giveFeedback.bind(this);
    }

    changeUsername() {
        this.setState({ usernameOverlay: true });
    }

    giveFeedback() {
        this.setState({ feedback: true });
    }


    render() {
        const list = [
            {
                title: 'Change password',
                icon: { name: 'lock' },
                onPress: this.constructor.changePassword,
            },
            {
                title: 'Change username',
                icon: { name: 'face' },
                onPress: this.changeUsername,
            },
            {
                title: 'Give feedback',
                icon: { name: 'feedback' },
                onPress: this.giveFeedback,
            },
            {
                title: 'Logout',
                icon: { name: 'sign-out', type: 'font-awesome' },
                onPress: this.constructor.logout,
            },
        ];

        return (
            <Screen>
                <Header
                    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e0000'}}
                    centerComponent={{ text: 'SETTINGS', style: {color: '#ffffff'} }}
                    outerContainerStyles={{ backgroundColor: '#c62828' }}
                />
                {
                    (this.state.usernameOverlay)
                        ? <InputModal
                            title="CHANGE YOUR USERNAME"
                            placeholder={FirebaseService.currentUser().displayName}
                            multiline={false}
                            style={{}}
                            onSave={text => this.constructor.updateUsername(text)}
                            onClose={() => this.setState({ usernameOverlay: false })}
                        />
                        : <View />
                }
                {
                    (this.state.feedback)
                        ? <InputModal
                            title="GIVE US YOUR FEEDBACK"
                            placeholder="Enter your feedback"
                            multiline
                            style={{ height: 160 }}
                            onSave={text => this.constructor.sendFeedback(text)}
                            onClose={() => this.setState({ feedback: false })}
                        />
                        : <View />
                }
                <List>
                    {
                        list.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.title}
                                leftIcon={item.icon}
                                onPress={() => item.onPress()}
                            />
                        ))
                    }
                </List>
            </Screen>
        );
    }
}
