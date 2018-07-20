import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import registerServiceWorker from './services/registerServiceWorker';
import App from './pages/app/app';
import FirebaseService from './services/firebaseService';
import './index.css';

document.title = 'Uniplatz';

function render(authed) {
    ReactDOM.render(
        <BrowserRouter>
            <App authed={authed} />
        </BrowserRouter>
        , document.getElementById('root'),
    );
}

FirebaseService.authenticatedHandler(() => {
    /** logged in */
    console.log('Logged in');
    FirebaseService.createUserAfterLogin();
    render(true);
}, () => {
    /** not logged in */
    console.log('Not authenticated');
    render(false);
}, user => {
    /** not authenticated */
    /** ignore for now */
    console.log(`Not verified: ${user.email}`);
    FirebaseService.createUserAfterLogin();
    render(true);
});

registerServiceWorker();
