import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Card, Button, FormLabel, FormInput, Header } from 'react-native-elements';
import FirebaseService from '../services/firebaseService';

export default class SignupView extends Component {
    constructor(props) {
        super(props);
        this.email = '';
        this.password = '';
        this.name = '';
        this.state = { loading: false };
    }

    signup() {
        this.setState({ loading: true });
        FirebaseService.createUser(this.name, this.email, this.password, err => {
            /** error */
            Alert.alert(
                'Error',
                'Please make sure that all inputs are valid'
            )
            this.setState({ loading: false });
        }, () => {
            /** success */
            this.setState({ loading: false });
        });
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View>
                <Header
                    statusBarProps={{ backgroundColor: '#8e0000', barStyle: 'light-content'}}
                    centerComponent={{ text: 'CREATE AN ACCOUNT', style: { color: '#ffffff' } }}
                    outerContainerStyles={{ backgroundColor: '#c62828' }}
                    leftComponent={{
                        icon: 'arrow-back', color: '#ffffff', underlayColor: '#c62828', onPress: () => goBack(),
                    }}
                />
                <View style={{ paddingVertical: 20 }}>
                    <Card>
                        <FormLabel>Full Name</FormLabel>
                        <FormInput
                            placeholder="Name"
                            autoCapitalize="words"
                            autoCorrect={false}
                            spellCheck={false}
                            onChangeText={text => { this.name = text; }}
                        />
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            placeholder="Use CampusNet Username (with .)"
                            autoCapitalize="none"
                            autoCorrect={false}
                            spellCheck={false}
                            onChangeText={text => { this.email = text; }}
                        />
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            secureTextEntry
                            placeholder="Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            spellCheck={false}
                            onChangeText={text => { this.password = text; }}
                        />

                        <Button
                            buttonStyle={{ marginTop: 20 }}
                            backgroundColor="#c62828"
                            title="Sign Up"
                            onPress={() => {
                                this.signup();
                            }}
                            loading={this.state.loading}
                        />
                    </Card>
                </View>
            </View>
        );
    }
}
