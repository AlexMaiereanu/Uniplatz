import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, FormField, Form, Input, Grid, Message, Segment } from 'semantic-ui-react';
import Footer from '../footer';
import NavBarAuth from '../../components/NavBarAuth';
import FirebaseService from '../../services/firebaseService';
import HeroImage from '../../assets/herobglogin.jpg';
import './login.css';

const links = [
    {
        name: 'LOGIN',
        url: '/login',
        active: true,
    },
    {
        name: 'SIGN UP',
        url: '/signup',
    },
];

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            email: '',
            password: '',
        };
        // binding 'this'
        this.login = this.login.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        /** authenticated handler */
        FirebaseService.authenticatedHandler(() => {
            /** logged in */
            console.log('Logged in');
            this.setState({
                redirectToReferrer: true,
            });
        }, () => {
            /** not logged in */
            console.log('Not authenticated');
            this.setState({
                redirectToReferrer: false,
            });
        }, user => {
            /** not authenticated */
            /** for now, ignore this and just log the user in */
            // alert(`Hi! Your email is currently not verified. We need to make sure you are a legitimate student at Jacobs University. For that, we need you to to open your Jacobs Email inbox and click on the link that we just sent you. If you haven't received an email there, please make sure that this is your correct Jacobs Email address:\n
            //     ${user.email}\n
            //     If it is not, just create a new account with your true Jacobs email address. If it is, and you haven't received an email from us, please contact us at info@uniplatz.co. You can also directly contact our tech lead at steve@uniplatz.co.\n
            //     Once you have verified your email, please log in again.`);
            // setTimeout(() => {
            //     /** we have to give us some time to create the user -> then we log him out again (dirty fix) */
            //     FirebaseService.logout();
            //     console.log('logged out');
            // }, 1000);
            this.setState({
                redirectToReferrer: true,
            });
        });
    }

    login() {
        FirebaseService.signIn(this.state.email, this.state.password, error => {
            if (error) {
                console.error(error.message);
            }
            alert('Unable to login.');
        }, () => {
        }, () => {
        });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        if (this.state.redirectToReferrer) {
            return (
                <Redirect to={from} />
            );
        }
        return (
            <div>
                <NavBarAuth links={links} />
                <div className="login-form">
                    <Grid
                        className="login-form-grid"
                        textAlign="center"
                        style={{ height: '100%' }}
                        verticalAlign="middle"
                    >
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Form size="large">
                                <Segment stacked>
                                    <FormField>
                                        <Input
                                            id="email-input"
                                            fluid
                                            icon="user"
                                            iconPosition="left"
                                            placeholder="CampusNet username (with .)"
                                            labelPosition="right"
                                            label={{ basic: true, content: '@jacobs-university.de' }}
                                            onChange={this.handleEmailChange}
                                        />
                                    </FormField>
                                    <FormField>
                                        <Input
                                            fluid
                                            id="password-input"
                                            icon="lock"
                                            iconPosition="left"
                                            placeholder="Password"
                                            type="password"
                                            onChange={this.handlePasswordChange}
                                        />
                                    </FormField>
                                    <Button
                                        className="login-btn"
                                        id="login-btn"
                                        onClick={() => this.login()}
                                        fluid
                                        size="large"
                                    >
                                    Login
                                    </Button>
                                </Segment>
                            </Form>
                            <Message>
                                {"Don't have an account yet?"} <Link to="/signup">Sign Up</Link>
                            </Message>
                        </Grid.Column>
                    </Grid>

                    <div>
                        <h1 className="hero-text">
                            Easy for you.<br className="hero-text-break" />
                            Easy for everyone.
                        </h1>
                        <img alt="hero" className="hero-image" src={HeroImage} />
                    </div>
                    <div id="pageFooterHome">2018 Uniplatz Technologies Inc.</div>
                    {/* <Footer /> */}
                </div>
            </div>

        );
    }
}

export default Login;
