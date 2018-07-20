import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';

function ItemCard({
    logo, header, price, description, email, name,
}) {
    return (
        <Card id="item-card" centered>
            <div id="image-container">
                <Image id="card-image" src={logo} />
            </div>
            <Card.Content>
                <Card.Header>
                    {header}
                </Card.Header>
                <Card.Meta>
                    <span className="date">
                        {`${price}€`}
                    </span>
                </Card.Meta>
            </Card.Content>
        </Card>
    );
}

ItemCard.propTypes = {
    logo: PropTypes.oneOfType([
        PropTypes.shape({
            uri: PropTypes.string,
        }),
        // Opaque type returned by require('./image.jpg')
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    header: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default ItemCard;
