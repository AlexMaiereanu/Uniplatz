import React, { Component } from 'react';
import { Dropdown, Button, Menu, Modal, Header, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import FirebaseService from '../../services/firebaseService';
import logo from '../../assets/logo.png';
import './index.css';
import InputModal from '../InputModal';
import TermsAndConditions from '../TextPage';
import SharedService from '../../services/sharedService';

class NavBarHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: props.activeItem,
            showModal: false,
            messageCount: '',
        };
        /* binding */
        this.renderLinks = this.renderLinks.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        /* icons */
        this.icons = {
            buy: 'shop',
            sell: 'upload',
            messages: 'mail',
            profile: 'user circle outline',
        };
        /** text data for the modals */
        this.textData = {
            Impressum: SharedService.getImpressum(),
            'Privacy Policy': SharedService.getPrivacyPolicy(),
            'Terms and Conditions': SharedService.getTermsAndConditions(),
        };
    }

    componentWillMount() {
        FirebaseService.getNumberOfNewMessages(err => console.error(err), count => {
            this.setState({ messageCount: count });
        });
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            activeItem: newProps.activeItem,
        });
    }

    handleItemClick(e, name) {
        this.setState({ activeDropdown: name.text });
    }

    renderLinks() {
        return this.props.links.map((link) => (
            <Menu.Item
                className="bullets"
                key={link.name}
                name={link.name}
                content={link.name === 'messages' ? this.state.messageCount : ''}
                icon={<Icon name={this.icons[link.name]} size="large" />}
                active={this.state.activeItem === link.name}
                onClick={(e, name) => {
                    this.props.onClick(e, name);
                    if (name.name === 'logout') {
                        this.setState({ showModal: true });
                    }
                }}
            />
        ));
    }

    renderLogoutModal() {
        return (
            <Modal id="logout-modal" open={this.state.showModal} size="tiny">
                <Header icon="sign out" content="Logging Out" />
                <Modal.Content>
                    <p>Are you sure you want to log out?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        basic
                        onClick={() => {
                            this.setState({ showModal: false });
                        }}>
                        <Icon name="remove" /> No
                    </Button>
                    <Button
                        color="black"
                        onClick={() => FirebaseService.logout()}
                    >
                        <Icon name="checkmark" /> Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        );
    }

    render() {
        return (
            <div>
                <Menu pointing secondary>
                    <Menu.Item id="logo">
                        <Image
                            src={logo}
                            onClick={(e) => {
                                this.props.onClick(e, { name: 'buy' });
                            }}
                        />
                    </Menu.Item>
                    <Menu.Menu position="right">
                        {this.renderLinks(this.state)}
                        <Dropdown icon="setting large" item>
                            <Dropdown.Menu style={{ top: 63 }}>
                                <Dropdown.Item icon={<Icon name="edit" size="large" />} text="Change Username" onClick={this.handleItemClick} />
                                <Dropdown.Item icon={<Icon name="privacy" size="large" />} text="Reset Password" onClick={this.handleItemClick} />
                                <Dropdown.Item icon={<Icon name="info" size="large" />} text="Terms and Conditions" onClick={this.handleItemClick} />
                                <Dropdown.Item icon={<Icon name="info" size="large" />} text="Privacy Policy" onClick={this.handleItemClick} />
                                <Dropdown.Item icon={<Icon name="info" size="large" />} text="Impressum" onClick={this.handleItemClick} />
                                <Dropdown.Item
                                    icon={<Icon name="sign out" size="large" />}
                                    text="Log out"
                                    onClick={() => {
                                        this.setState({ showModal: true });
                                    }} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>

                { this.renderLogoutModal() }

                <InputModal
                    active={this.state.activeDropdown === 'Reset Password'}
                    title={this.state.activeDropdown}
                    text={`Are you sure you want to reset your password? We will send an email with instructions to ${FirebaseService.currentUser().email}.`}
                    inputIcon="privacy"
                    inputPlaceholder="Enter your new password"
                    isPassword
                    onClose={() => {
                        this.setState({ activeDropdown: '' });
                    }}
                    onSave={(input) => {
                        FirebaseService.currentUser().updatePassword(input)
                            .catch(err => alert(err.message))
                            .then(() => this.setState({ activeDropdown: '' }));
                    }}
                />

                <InputModal
                    active={this.state.activeDropdown === 'Change Username'}
                    title={this.state.activeDropdown}
                    text="Are you sure you want to change your username?"
                    inputIcon="user circle outline"
                    inputPlaceholder={FirebaseService.currentUser().displayName}
                    onClose={() => {
                        this.setState({ activeDropdown: '' });
                    }}
                    onSave={(input) => {
                        FirebaseService.updateUsername(input, err => {
                            console.error(err);
                        }, () => {
                            this.setState({ activeDropdown: '' });
                        });
                    }}
                />

                <div id="termsAndConditionsModal" className="termsAndConditionsStyle">
                    <Modal
                        className="termsAndConditionsModal"
                        open={['Impressum', 'Terms and Conditions', 'Privacy Policy'].indexOf(this.state.activeDropdown) !== -1}
                        onClose={() => this.setState({ activeDropdown: '' })}
                    >
                        <TermsAndConditions onClose={() => this.setState({ activeDropdown: '' })} data={this.textData[this.state.activeDropdown]} name={this.state.activeDropdown} />
                    </Modal>
                </div>
            </div>
        );
    }
}

NavBarHome.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        active: PropTypes.bool,
    })).isRequired,
};

export default NavBarHome;
