import React, { Component } from 'react';
import { Menu, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

class NavBarAuth extends Component {
    static capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    constructor(props) {
        super(props);
        this.renderLinks = this.renderLinks.bind(this);
        this.icons = {
            LOGIN: 'sign in',
            'SIGN UP': 'add user',
        };
    }

    renderLinks() {
        return this.props.links.map((link) => (
            <Menu.Item
                key={link.name}
                name={this.constructor.capitalize(link.name)}
                icon={<Icon name={this.icons[link.name]} size="large" />}
                active={link.active}
                as={Link}
                to={link.url}
            />
        ));
    }

    render() {
        return (
            <Menu pointing secondary style={{marginRight: 60}}>
                <Menu.Item id="logo">
                    <Image src={logo} />
                </Menu.Item>
                <Menu.Menu position="right">
                    {this.renderLinks()}
                </Menu.Menu>
            </Menu>
        );
    }
}

NavBarAuth.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        active: PropTypes.bool,
    })).isRequired,
};

export default NavBarAuth;
