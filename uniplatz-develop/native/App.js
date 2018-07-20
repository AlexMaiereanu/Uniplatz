import React, { Component } from 'react';
import { Heading, Tile, Text, Button } from '@shoutem/ui';
import AuthNavigator from './src/pages/authNavigator';
import HomeNavigator from './src/pages/homeNavigator';
import FirebaseService from './src/services/firebaseService';
import LoadingView from './src/components/LoadingView';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedin: false,
            loading: true,
            verified: true,
            email: '',
        };
        FirebaseService.authenticatedHandler(() => {
            /** logged in */
            this.setState({
                loggedin: true,
                loading: false,
                verified: true,
            });
        }, () => {
            /** not logged in */
            this.setState({
                loggedin: false,
                loading: false,
                verified: true,
            });
        }, user => {
            /** email not verified */
            this.setState({
                loggedin: false,
                loading: false,
                verified: false,
                email: user.email,
            });
        });
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleStateChange(user, verified) {
        if (verified) {
            this.setState({
                loggedin: (user != null),
                verified: true,
            });
        } else {
            this.setState({
                loggedin: (user != null),
                verified: false,
                email: user.email,
            });
        }
    }

    render() {
        if (!this.state.verified) {
            return (
                <Tile styleName="text-centric">
                    <Heading>Please verify email</Heading>
                    <Text>{this.state.email}</Text>
                    <Button onPress={() => FirebaseService.verifyEmail(() => {}, () => {})} >
                        <Text>Resend Email</Text>
                    </Button>
                    <Button onPress={() => FirebaseService.logout()}>
                        <Text>Just did! (Login again)</Text>
                    </Button>
                    <Button onPress={() => FirebaseService.logout()}>
                        <Text>Logout</Text>
                    </Button>
                </Tile>
            );
        }
        if (this.state.loading) {
            return <LoadingView />;
        }
        if (this.state.loggedin) {
            return <HomeNavigator />;
        }
        return <AuthNavigator screenProps={onStateChange = this.handleStateChange} />;
    }
}
