import React from 'react';
import './footer.css';
import GooglePlay from '../assets/GooglePlay.png';
import AppStore from '../assets/AppStore.png';

const Footer = () => (
    <div id="footer">
        <div id="bullet">
            <ul>
                <li>About</li>
                <li>How it works</li>
                <li>Contact Us</li>
            </ul>
            <ul>
                <li>Uniplatz API</li>
                <li>Careers</li>
                <li>Our Story</li>
            </ul>
        </div>
        <hr />
        <div id="buttons">
            <img className="AppStoreButton" alt="App Store" src={AppStore} />
            <img className="GooglePlayButton" alt="Google Play" src={GooglePlay} />
        </div>
        <hr />
        <p id="copyright">2018 Uniplatz Technologies Inc.</p>
    </div>
);

export default Footer;
