import React, { Component } from 'react';
import { Grid, Modal } from 'semantic-ui-react';
import ItemCard from '../../components/ItemCard';
import ProductDetail from './detail';
import FirebaseService from '../../services/firebaseService';
import HeroBackground from '../../assets/HeroBackground.jpg';
import './buy.css';

class BuySection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            activeItem: {},
            productOpened: false,
        };
        this.clickItem = this.clickItem.bind(this);
    }

    componentWillMount() {
        this.loadPosts();
    }

    loadPosts() {
        FirebaseService.getAllActivePosts(posts => {
            this.setState({ posts });
        });
    }

    createCards() {
        const result = [];
        for (let i = 0; i < this.state.posts.length; i += 1) {
            result.push(
                <Grid.Column key={i} onClick={(e) => this.clickItem(e, i)}>
                    <ItemCard
                        key={i}
                        logo={this.state.posts[i].imageUrl}
                        header={this.state.posts[i].name}
                        price={this.state.posts[i].price}
                        description={this.state.posts[i].description}
                        email="s.abreu@jacobs-university.de"
                        name={this.state.posts[i].ownerId}
                    />
                </Grid.Column>);
        }
        return result;
    }


    clickItem(e, item) {
        this.setState({
            activeItem: this.state.posts[item],
            productOpened: true,
        });
    }

    falseModal() {
        this.setState({
            activeItem: {},
            productOpened: false,
        });
    }

    render() {
        return (
            <div>
                <div id="productModal" className="modalStyle">
                    <Modal
                        className="buyModal"
                        open={this.state.productOpened}
                        onClose={() => this.falseModal()}
                    >
                        <ProductDetail onClose={() => this.falseModal()} item={this.state.activeItem} />
                    </Modal>
                </div>
                <div className="hero vertical-center">
                    <img src={HeroBackground} alt="Background" />
                </div>
                <Grid id="item-grid" columns="4">{this.createCards()}</Grid>
            </div>
        );
    }
}

export default BuySection;
