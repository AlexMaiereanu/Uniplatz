import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from '../login/login';
import Home from '../home/home';
import Signup from '../signup/signup';
import BuySection from '../home/buy';
import AddPost from '../add-post/add-post';
import PrivateRoute from '../../components/PrivateRoute';
import './app.css';

function App({ authed }) {
    return (
        <div>
            <PrivateRoute authed={authed} exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
        </div>
    );
}

App.propTypes = {
    authed: PropTypes.bool.isRequired,
};

export default App;
