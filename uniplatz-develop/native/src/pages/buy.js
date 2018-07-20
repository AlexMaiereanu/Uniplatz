import React, { Component } from 'react';
import { Header } from 'react-native-elements';
import { TouchableOpacity, Screen, ListView, Card, Image, View, Subtitle, Caption, GridRow } from '@shoutem/ui';
import LoadingView from '../components/LoadingView';
import BuyModal from '../components/BuyModal';
import FirebaseService from '../services/firebaseService';

export default class BuyView extends Component {
    static buyPressed(post) {
        FirebaseService.sendMessage(`Hi there, I am interested in your '${post.name}'`, post.ownerId, post.postId, err => {
            console.error(err);
        }, () => {});
    }

    constructor() {
        super();
        /* state has loading and posts */
        this.state = {
            loading: true,
            posts: [],
            showDetail: false,
            currentPost: null,
        };
        this.popDetail = this.popDetail.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        /* get all active posts */
        FirebaseService.getAllActivePosts(posts => {
            this.setState({ posts, loading: false });
        });
    }

    popDetail(newPost) {
        this.setState({ showDetail: true, currentPost: newPost });
    }

    renderRow(rowData, sectionId, index) {
        /* row data is data for one row (data is posts) */
        const cellViews = rowData.map((post) => (
            <TouchableOpacity key={index + post.name} styleName="flexible" onPress={() => { this.popDetail(post); }}>
                <Card styleName="flexible">
                    <Image
                        styleName="medium-wide"
                        style={{flexDirection: 'row', height: 150}}
                        source={{ uri: post.imageUrl }}
                    />
                    <View styleName="content" style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Subtitle numberOfLines={3}>{post.name}</Subtitle>
                        <View style={{
                            backgroundColor: '#c62828', paddingLeft: 5, paddingRight: 5, width: 65, borderRadius: 0,
                        }}>
                            <Caption
                                styleName="collapsible"
                                numberOfLines={2}
                                style={{ color: '#ffffff', alignSelf: 'center' }}>
                                {post.price}€
                            </Caption>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        ));
        return (
            <GridRow columns={2}>
                {cellViews}
            </GridRow>
        );
    }

    render() {
    /* group data into rows of two elements */
        const groupedData = GridRow.groupByRows(this.state.posts, 2, () => 1);
        return (
            <Screen>
                <Header
                    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e0000' }}
                    centerComponent={{ text: 'BUY', style: { color: '#ffffff' } }}
                    outerContainerStyles={{ backgroundColor: '#c62828' }}
                />
                {
                    (this.state.loading)
                        ? <LoadingView text="LOADING POSTS.." />
                        : <ListView data={groupedData} renderRow={this.renderRow} />
                }
                {
                    (this.state.showDetail)
                        ? <BuyModal
                            post={this.state.currentPost}
                            onBuy={() => this.constructor.buyPressed(this.state.currentPost)}
                            onClose={() => this.setState({ showDetail: false })}
                        />
                        : <View />
                }
            </Screen>
        );
    }
}
