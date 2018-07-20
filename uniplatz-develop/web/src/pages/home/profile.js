import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Statistic, Modal, Button } from 'semantic-ui-react';
import ItemCard from '../../components/ItemCard';
import FirebaseService from '../../services/firebaseService';
import ProfilePicture from '../../assets/UniplatzLogo.jpg';
import './profile.css';

const EditPostModal = ({
    title, sold, onClose, markClicked, deleteClicked, editClicked,
}) => (
    <Modal onClose={onClose} open className="edit-post-modal">
        <Modal.Header>
            {title}
        </Modal.Header>
        <Modal.Content>
            <p>
                What would you like to do?
            </p>
            <Button onClick={markClicked}>
                Mark as {sold ? 'un' : ''}sold
            </Button>
            <Button onClick={editClicked}>
                Edit
            </Button>
            <Button color="red" onClick={deleteClicked}>
                Delete
            </Button>
        </Modal.Content>
    </Modal>
);

EditPostModal.propTypes = {
    title: PropTypes.string.isRequired,
    sold: PropTypes.bool.isRequired,
};

class ProfileSection extends Component {
    constructor() {
        super();
        this.state = {
            activePosts: [],
            soldPosts: [],
            user: {},
            selectedPost: null,
        };
        /* binding this */
        this.loadData = this.loadData.bind(this);
    }

    componentWillMount() {
        /* load data */
        this.loadData();
    }

    loadData() {
        /* get user */
        const user = FirebaseService.currentUser();
        this.setState({ user });
        /** get active posts */
        this.setState({ activePosts: [], soldPosts: [] });
        this.loadPosts(true);
        this.loadPosts(false);
    }

    loadPosts(active) {
        FirebaseService.getOwnPosts(active, err => {
            console.error(err);
        }, newPost => {
            this.setState(prev => {
                const state = prev;
                if (active) {
                    state.activePosts.push(newPost);
                } else {
                    state.soldPosts.push(newPost);
                }
                return state;
            });
        });
    }

    handleClick(post) {
        this.setState({ selectedPost: post });
    }

    createCards(posts) {
        const result = [];
        for (let i = 0; i < posts.length; i += 1) {
            result.push(
                <Grid.Column key={i} onClick={() => this.handleClick(posts[i])}>
                    <ItemCard
                        key={i}
                        logo={posts[i].imageUrl}
                        header={posts[i].name}
                        price={posts[i].price}
                        description={posts[i].description}
                        email={this.state.user.email}
                        name={this.state.user.displayName}
                    />
                </Grid.Column>,
            );
        }
        return (result.length === 0) ? (<p style={{ marginTop: `${1}em` }}>No items to show.</p>) : result;
    }

    markPost() {
        const post = this.state.selectedPost;
        const index = this.state.activePosts.findIndex(val => val === this.state.selectedPost) !== -1;
        const markAsSold = (index > -1) ? index : this.state.soldPosts.findIndex(val => val === this.state.selectedPost);
        FirebaseService.markPost(post, markAsSold, err => {
            /** error */
            if (err) {
                console.error(err);
            }
        }, () => {
            /** success, reload data (to display changes) */
            this.loadData();
        });
    }

    closeModal() {
        this.setState({ selectedPost: null });
    }

    render() {
        return (
            <div>
                <div className="hero-profile">
                    <img alt="tis is you" id="profile-picture" src={ProfilePicture} />
                    <div id="name-container">
                        <p>Hello, {this.state.user.displayName}!</p>
                    </div>
                </div>
                {
                    (!this.state.selectedPost)
                        ? null
                        :
                        <EditPostModal
                            title={this.state.selectedPost.name}
                            sold={this.state.activePosts.findIndex(val => val === this.state.selectedPost) === -1}
                            onClose={() => this.closeModal()}
                            markClicked={() => { this.closeModal(); this.markPost(); }}
                            editClicked={() => { this.closeModal(); alert('Patience, young padawan'); }}
                            deleteClicked={() => { this.closeModal(); alert('Under construction mate'); }}
                        />
                }
                <div id="selling-info-container">
                    <div>
                        <Statistic>
                            <Statistic.Value style={{ color: 'white', fontFamily: 'Roboto-Light' }}>{this.state.soldPosts.length}</Statistic.Value>
                            <Statistic.Label style={{ color: 'white', fontFamily: 'Roboto-Light' }}>Items Sold</Statistic.Label>
                        </Statistic>
                    </div>
                    <div>
                        <Statistic>
                            <Statistic.Value style={{ color: 'white', fontFamily: 'Roboto-Light' }}>
                                €{Math.round(this.state.soldPosts.map(e => Number(e.price)).reduce((a, b) => a + b, 0) * 100) / 100}
                            </Statistic.Value>
                            <Statistic.Label style={{ color: 'white', fontFamily: 'Roboto-Light' }}>Amount Made</Statistic.Label>
                        </Statistic>
                    </div>
                    <div>
                        <Statistic>
                            <Statistic.Value style={{ color: 'white', fontFamily: 'Roboto-Light' }}>{this.state.activePosts.length}</Statistic.Value>
                            <Statistic.Label style={{ color: 'white', fontFamily: 'Roboto-Light' }}>Active Posts</Statistic.Label>
                        </Statistic>
                    </div>
                </div>
                <div id="post-container">
                    <p> Active Posts </p>
                    <Grid columns="4">
                        { this.createCards(this.state.activePosts) }
                    </Grid>
                </div>
                <div id="post-container">
                    <p> Items Sold </p>
                    <Grid columns="4">
                        { this.createCards(this.state.soldPosts) }
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ProfileSection;
