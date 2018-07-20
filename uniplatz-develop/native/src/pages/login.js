import React, { Component } from 'react';
import { View, Alert, Image } from 'react-native';
import { Card, Button, FormLabel, FormInput, Header } from 'react-native-elements';
import FirebaseService from '../services/firebaseService';

export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: false,
        };
        this.email = '';
        this.password = '';
    }

    login() {
        this.setState({ loading: true });
        FirebaseService.signIn(this.email, this.password, (err) => {
            /** error signing in */
            if (err) {
                Alert.alert(
                    'Error',
                    'The username and password is not a combination of an existing account'
                )
                this.setState(
                    {
                        loading: false
                    }
                )
            }
        }, user => {
            /** not verified */
            this.props.screenProps(user, false);
        }, user => {
            /** logged in */
            this.props.screenProps(user, true);
        });
    }

    render() {
        return (
            <View>
                <Header
                    statusBarProps={{ backgroundColor: '#8e0000', barStyle: 'light-content'}}
                    centerComponent={{ text: 'LOGIN', style: {color: '#ffffff'} }}
                    outerContainerStyles={{ backgroundColor: '#c62828' }}
                />    
                <View style={{ paddingVertical: 20}}>
                    <Card>
                        <View style={{justifyContent: 'center', alignItems: 'center',}}>
                            <Image source={require('../img/uniplatz_word.png')} style={{height: 60, width: 300, marginBottom: 40, marginTop: 30}}/>
                        </View>
                        <FormLabel>Username</FormLabel>
                        <FormInput
                            placeholder="CampusNet Username (with .)"
                            autoCapitalize="none"
                            autoCorrect={false}
                            spellCheck={false}
                            onChangeText={email => { this.email = email; }}
                        />
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            secureTextEntry
                            autoCapitalize="none"
                            autoCorrect={false}
                            spellCheck={false}
                            placeholder="Password"
                            onChangeText={pw => { this.password = pw; }}
                        />
                        <Button
                            buttonStyle={{ marginTop: 20 }}
                            backgroundColor="#c62828"
                            title={this.state.loading ? '' : 'Login'}
                            onPress={() => {
                                this.login();
                            }}
                            loading={this.state.loading}
                        />
                        <Button
                            buttonStyle={{ marginTop: 20 }}
                            backgroundColor="transparent"
                            textStyle={{ color: 'grey' }}
                            title="Sign Up"
                            onPress={() => {
                                this.props.navigation.navigate('SignUp');
                            }}
                        />
                    </Card>
                </View>
            </View>
        );
    }
}
