import React, { Component } from 'react';
import { Button, FormField, Form, Input, Grid, Message, Segment, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Footer from '../footer';
import NavBarAuth from '../../components/NavBarAuth';
import FirebaseService from '../../services/firebaseService';
import HeroImage from '../../assets/herobglogin.jpg';
import TermsAndConditions from '../../components/TextPage';
import './signup.css';

const links = [
    {
        name: 'LOGIN',
        url: '/login',
    },
    {
        name: 'SIGN UP',
        url: '/signup',
        active: true,
    },
];

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
            termsAndConditionsOpened: false,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.popupModal = this.popupModal.bind(this);
        this.falseModal = this.falseModal.bind(this);
    }

    popupModal() {
        this.setState(prev => {
            const state = prev;
            state.termsAndConditionsOpened = true;
            return state;
        });
    }

    falseModal() {
        this.setState(prev => {
            const state = prev;
            state.termsAndConditionsOpened = false;
            return state;
        });
    }

    buttonPressed() {
        FirebaseService.createUser(this.state.name, this.state.email, this.state.password, error => {
            alert(error.message);
            console.error(error);
        }, () => {
            console.log('success signing up.');
        });
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    // TODO: Render modal
    // make the message popup

    render() {
        return (
            <div>
                <div id="termsAndConditionsModal" className="termsAndConditionsStyle">
                    <Modal
                        className="termsAndConditionsModal"
                        open={this.state.termsAndConditionsOpened}
                        onClose={() => this.falseModal()}
                    >
                        <TermsAndConditions onClose={() => this.falseModal()} name="Signup" />
                    </Modal>
                </div>
                <NavBarAuth links={links}/>
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
                                            id="name-input"
                                            fluid
                                            icon="user"
                                            iconPosition="left"
                                            placeholder="Full Name"
                                            onChange={this.handleNameChange}
                                        />
                                    </FormField>
                                    <FormField>
                                        <Input
                                            id="email-input"
                                            fluid
                                            icon="mail"
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
                                    <Message id="terms-and-conditions" onClick={this.popupModal}>
                                        By clicking sign-up you are agreeing to our <br /><b>Terms and Conditions</b> and <b>Privacy Policy</b>
                                    </Message>
                                    <Button
                                        onClick={() => this.buttonPressed()}
                                        fluid
                                        size="large"
                                    >
                                    Sign Up
                                    </Button>
                                </Segment>
                            </Form>
                            <Message>
                                Already have an account? <Link to="/login">Log In</Link>
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

export default Signup;
