import React from 'react';
import PropTypes from 'prop-types';
import '../../pages/home/messages.css';
import './index.css';

function ChatCard({
    title, time, imageUrl, partnerName, lastMessage, oddeven, active, seen, sentByMe,
}) {
    return (
        <div className={`chat-card-container ${oddeven} ${active} ${(seen || sentByMe) ? 'seen' : ''}`}>
            <div className="chat-image-container">
                <img src={imageUrl} alt="post" />
            </div>
            <div className="chat-detail-container">
                <h2 className="chat-title">{title}</h2>
                <h4 className="chat-partner">With {partnerName}</h4>
                <p className="chat-message">{lastMessage}</p>
                <p className="chat-time">{time}</p>
            </div>
        </div>
    );
}

ChatCard.propTypes = {
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    partnerName: PropTypes.string.isRequired,
    lastMessage: PropTypes.string.isRequired,
    oddeven: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    seen: PropTypes.bool.isRequired,
    sentByMe: PropTypes.bool.isRequired,
};

export default ChatCard;
