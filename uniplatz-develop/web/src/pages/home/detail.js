import React, { Component } from 'react';
import { Button, Header, Image } from 'semantic-ui-react';
import './detail.css';
import FirebaseService from '../../services/firebaseService';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        const { item } = props;
        this.state = {
            item
        };
    }


    render() {
        return (
            <div className="buyDetail">
                <div id="detailImageContainer">
                    <Image id="detailImage" src={this.state.item.imageUrl} />
                </div>
                <div id="detailContent">
                    <div>
                        <Header style={{ fontSize: 40, marginBottom: 0 }}>{this.state.item.name}</Header>
                        <div id="detailLocation">
                            <h5 id="detailLocationContent">{this.state.item.location}</h5>
                        </div>

                        <div className="detailSection">
                            <h5 id="detailDescription">Description: </h5>
                        </div>
                        <div className="detailSectionContent">
                            <p id="detailDescriptionContent">{this.state.item.description}</p>
                        </div>
                        <div className="detailSection">
                            <h5 id="detailDescription">Price:</h5>
                        </div>
                        <div className="detailSectionContent">
                            <h1 id="detailPrice"><sup id="priceSup">€</sup>{this.state.item.price}</h1>
                        </div>
                        <div id="detailButton">
                            <Button
                                style={{
                                    width: 300,
                                    height: 50,
                                    backgroundColor: '#c62828',
                                    fontSize: 15,
                                    color: '#ffffff',
                                    borderRadius: 3,
                                }}
                                onClick={() => {
                                    if (this.state.item.ownerId !== FirebaseService.currentUser().uid) {
                                        FirebaseService.sendPostRequest(this.state.item.name, this.state.item.ownerId, this.state.item.postId, err => {
                                            console.error(err.message);
                                        }, () => {
                                            this.props.onClose();
                                        });
                                    } else {
                                        alert('You cannot request your own item. Come on mate..');
                                    }
                                }}
                            >
                                Request
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;
