import React from 'react';
import PropTypes from 'prop-types';
import '../../pages/home/messages.css';

function MessageCard({
    name, message, sentByMe, time,
}) {
    const fromMe = sentByMe ? 'from-me' : '';

    return (
        <div className={`message ${fromMe}`}>
            <div className="message-body">
                { message }
            </div>
            <div className="message-time">
                {time}
            </div>
        </div>
    );
}

MessageCard.propTypes = {
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    sentByMe: PropTypes.bool.isRequired,
};

export default MessageCard;
