import React, { Component } from 'react';
import NavBarHome from '../../components/NavBarHome';
import BuySection from './buy';
import MessagesSection from './messages';
import ProfileSection from './profile';
import AddPost from '../add-post/add-post';
import './home.css';
import FirebaseService from '../../services/firebaseService';

class Home extends Component {
    static logout() {
        FirebaseService.logout();
    }

    constructor() {
        super();
        this.state = {
            activeItem: 'buy',
            sections: [
                {
                    name: 'buy',
                    onClick: this.handleItemClick,
                },
                {
                    name: 'sell',
                    onClick: this.handleItemClick,
                },
                {
                    name: 'messages',
                    onClick: this.handleItemClick,
                },
                {
                    name: 'profile',
                    onClick: this.handleItemClick,
                },
            ],
        };
        /* binding function */
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e, name) {
        /* change the active item */
        if (name.name === 'logout') {
            return;
        }
        this.setState({
            activeItem: name.name,
        });
    }

    renderComponent() {
        /* render the main view on the page */
        if (this.state.activeItem === 'profile') {
            return <ProfileSection />;
        } else if (this.state.activeItem === 'messages') {
            return <MessagesSection />;
        } else if (this.state.activeItem === 'buy') {
            return <BuySection />;
        } else if (this.state.activeItem === 'sell') {
            return <AddPost />;
        }
        return <h1>Page not found</h1>;
    }

    render() {
        return (
            <div className="mainContainer">
                <NavBarHome
                    activeItem={this.state.activeItem}
                    onClick={this.handleItemClick}
                    links={this.state.sections}
                />
                <div className="container">
                    { this.renderComponent() }
                </div>
                {
                    (this.state.activeItem === 'messages')
                        ? null
                        : <div id="pageFooter">© Uniplatz 2018</div>
                }
            </div>
        );
    }
}

export default Home;
