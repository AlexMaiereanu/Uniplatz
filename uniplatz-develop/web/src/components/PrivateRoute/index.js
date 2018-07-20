import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/* PrivateRoute component definition */
const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    /** this is a route that will redirect the user to /login when he/she is not authenticated */
    <Route
        {...rest}
        render={(props) => (authed === true
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)} />
);

export default PrivateRoute;
