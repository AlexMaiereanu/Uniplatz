import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Form, Message } from 'semantic-ui-react';
import FirebaseService from '../../services/firebaseService';
import SharedService from '../../services/sharedService';
import PostVerification from '../../services/postVerification';
import './add-post.css';

class AddPost extends Component {
    static MessageWarning(text) {
    /** this renders a message warning from a given text */
        return (
            <Message warning key={text}>
                <Message.Header>Error</Message.Header>
                <p>{text}</p>
            </Message>
        );
    }

    static getEmptyState() {
    /** this returns an empty state */
        const item = {
            description: '',
            imageUrl: '',
            location: '',
            name: '',
            ownerId: '',
            price: '',
        };
        const state = {
            item,
            file: null,
            errors: [],
            validImage: false,
            loading: false,
            done: false,
        };
        return state;
    }

    constructor(props) {
        super(props);
        /* leave out buyerId, soldDate. add creation data later */
        this.state = this.constructor.getEmptyState();
        this.locations = SharedService.possibleLocations().map(e => ({ key: e, text: e, value: e }));
        /* bind functions */
        this.onDrop = this.onDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        /* set ownerId on the item */
        this.setState(prev => {
            const state = prev;
            state.item.ownerId = FirebaseService.currentUser().uid;
            return state;
        });
    }

    onDrop(e) {
    /* called when a file was selected */
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];
        const admittedTypes = ['image/jpg', 'image/jpeg', 'image/png'];

        if (admittedTypes.indexOf(file.type) !== -1) {
            reader.onloadend = () => {
                /** correct format and loaded -> reset errors and set file */
                this.setState({
                    file,
                    errors: [],
                    validImage: true,
                });
            };
            reader.readAsDataURL(file);
        } else {
            this.setState({
                validImage: false,
                errors: ['Invalid image type. Supported types are .png, .jpg and .jpeg'],
            });
        }
    }

    handleSubmit() {
        /* show loading indicator */
        this.setState({ loading: true });

        /** errors with the input */
        const errors = PostVerification.verifyPost(this.state.item);
        if (!this.state.validImage) {
            /** if the image is invalid, stop */
            errors.push('Invalid image type. Supported types are .png, .jpg and .jpeg');
            this.setState({
                loading: false,
                errors,
            });
            return;
        } else if (errors.length > 0) {
            /** if there are any errors, stop and show errors */
            this.setState({ errors, loading: false });
            return;
        }

        /* upload the image to the database */
        FirebaseService.uploadImage(this.state.file, error => {
            console.error(error);
            /* failed to upload image, show warning and return */
            this.setState({ loading: false, errors: [error.message] });
        }, (downloadURL) => {
            /* success -> save the imageUrl and reset all errors */
            this.setState((prevState) => {
                const newState = prevState;
                newState.item.imageUrl = downloadURL;
                newState.errors = [];
                return newState;
            });
            /* ready to upload the post to the database */
            const { item } = this.state;
            /** add creation date to the post */
            const post = item;
            post.creationDate = Date.now();
            /** upload the post */
            FirebaseService.createPost(post, error => {
                /* failed to upload -> display warning */
                this.setState({
                    loading: false,
                    errors: ['Failed to upload your post. Please try again in a moment.'],
                });
                console.error(error);
            }, () => {
                /* set done to true -> redirect */
                // TODO: For now just redirect, after bug is resolved, instead of directly redirecting
                // First make a popup, notifying the user that the post has been successfully created
                // do this in render() method
                this.setState(prevState => {
                    let newState = prevState;
                    newState = this.constructor.getEmptyState();
                    newState.done = true;
                    return newState;
                });
            });
        });
    }

    handleChange(e) {
    /** called when any of the text input fields are changed */
        e.persist();
        this.setState((prevState) => {
            const newState = prevState;
            newState.item[e.target.name] = e.target.value;
            return newState;
        });
    }

    handleSelectChange(e) {
    /** called when a location is selected */
        if (e.persist) {
            e.persist();
        }
        setTimeout(() => {
            this.setState(prev => {
                const state = prev;
                state.item.location = e.target.children[0].innerHTML;
                return state;
            });
        }, 10);
    }

    render() {
        /* if submitted successfully, go to home */
        // if (this.state.done) {
        //     const { from } = this.props.location.state || { from: { pathname: '/' } };
        //     return (
        //         <Redirect to={from} />
        //     );
        // }

        /* render add item view */
        const renderItems = this.state.errors.map(text => this.constructor.MessageWarning(text));

        renderItems.push(
            <Form key="1">
                <div className="form-style">
                    <input
                        type="text"
                        name="name"
                        maxLength={20}
                        placeholder="Name"
                        value={this.state.item.name}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={this.state.item.price}
                        onChange={this.handleChange}
                    />
                    <Form.Select
                        placeholder="Pick a location"
                        options={this.locations}
                        name="location"
                        value={this.state.item.location}
                        onChange={this.handleSelectChange}
                    />
                    <textarea
                        name="description"
                        maxLength={320}
                        placeholder="Write a description for your post"
                        value={this.state.item.description}
                        onChange={this.handleChange}
                    />
                    <p>
                        Hint: Upload your image in square format for the best results.
                    </p>
                    <input
                        id="photo"
                        type="file"
                        onChange={e => this.onDrop(e)}
                    />
                    {
                    /* short loading animation when button is clicked */
                        this.state.loading
                            ?
                            <Form.Button basic loading fluid color="grey">
                                Submit
                            </Form.Button>
                            :
                            <Form.Button
                                fluid
                                color="grey"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Form.Button>
                    }
                </div>
            </Form>,
        );

        return (
            <div className="container">
                {renderItems}
            </div>
        );
    }
}

export default AddPost;
