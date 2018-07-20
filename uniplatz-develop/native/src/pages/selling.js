import React, { Component } from 'react';
import { Alert, View, ScrollView } from 'react-native';
import { Header, Card, List, ListItem } from 'react-native-elements';
import { Heading, Title, Subtitle, Screen } from '@shoutem/ui';
import FirebaseService from '../services/firebaseService';

export default class SellingView extends Component {
    constructor() {
        super();
        this.state = {
            activePosts: [],
            soldPosts: [],
            totalSold: 0,
        };
        this.handleItemSelect = this.handleItemSelect.bind(this);
        this.markPostAs = this.markPostAs.bind(this);
    }

    componentWillMount() {
        /* fetch active and sold posts */
        this.reloadData();
    }

    reloadData() {
        this.setState({ activePosts: [], soldPosts: [], totalSold: 0 });
        this.dbFetch(true);
        this.dbFetch(false);
    }

    markPostAs(post, markAsSold) {
        FirebaseService.markPost(post, markAsSold, err => {
            /** error */
            if (err) {
                console.error(err);
            }
        }, () => {
            /** success */
            this.reloadData();
        });
    }

    dbFetch(active) {
        /* firebase data */
        FirebaseService.getOwnPosts(active, error => {
            console.error(error);
        }, newPost => {
            /** add new post to state */
            this.setState((prev) => {
                const state = prev;
                if (active) {
                    state.activePosts.push(newPost);
                } else {
                    state.soldPosts.push(newPost);
                    state.totalSold += parseFloat(newPost.price);
                    // state.totalSold = Math.round(state.totalSold * 100) / 100;
                }
                return state;
            });
        });
    }

    handleItemSelect(post) {
        const sold = this.state.activePosts.findIndex(val => val === post) === -1;
        Alert.alert(
            post.name,
            'What would you like to do?',
            [
                {
                    text: `Mark as ${sold ? 'un' : ''}sold`,
                    onPress: () => this.markPostAs(post, !sold),
                },
                { text: 'Cancel', onPress: null },
            ],
        );
    }

    renderListItems(list) {
    /* render one ListItem for each element in the given list */
        return list.map((value, index) => (
            <ListItem
                roundAvatar
                key={index}
                avatar={{ uri: value.imageUrl }}
                title={value.name}
                subtitle={`${value.price}€`}
                onPress={() => this.handleItemSelect(value)}
                containerStyle={{ borderColor: '#e8e8e8', borderWidth: 0.3, borderBottomWidth: 0.25 }}
            />
        ),
        );
    }

    render() {
        return (
            <Screen>
                <Header
                    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e0000'}}
                    centerComponent={{ text: 'MY ITEMS', style: { color: '#ffffff' } }}
                    outerContainerStyles={{ backgroundColor: '#c62828' }}
                />
                <ScrollView>
                    <Card title="TOTAL SOLD" style={{ marginBottom: 20 }}>
                        <Heading style={{ textAlign: 'center', marginBottom: 5 }}>
                            €{this.state.totalSold}
                        </Heading>
                    </Card>
                    <View style={{ padding: 20 }}>
                        <Title style={{ marginBottom: 5, color: '#c62828' }}>ACTIVE ITEMS</Title>
                        {
                            (this.state.activePosts.length > 0) ?
                                <List containerStyle={{ borderTopWidth: 0 }}>
                                    { this.renderListItems(this.state.activePosts) }
                                </List>
                                : <Subtitle>You don't have any active post</Subtitle>
                        }

                        <Title style={{ marginTop: 20, marginBottom: 5, color: '#c62828' }}>SOLD ITEMS</Title>
                        {
                            (this.state.soldPosts.length > 0) ?
                                <List containerStyle={{ borderTopWidth: 0 }}>
                                    { this.renderListItems(this.state.soldPosts) }
                                </List>
                                : <Subtitle>You don't have any sold post</Subtitle>
                        }
                    </View>
                </ScrollView>
            </Screen>
        );
    }
}
