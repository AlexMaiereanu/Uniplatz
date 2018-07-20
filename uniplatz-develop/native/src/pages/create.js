import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Screen, TextInput, DropDownMenu, Button, Icon, ScrollView } from '@shoutem/ui';
import { Header } from 'react-native-elements';

export default class CreateView extends Component {
    constructor() {
        super();
        /* possible locations for the item */
        this.locations = [
            { title: 'C3', value: 'c3' },
            { title: 'Krupp', value: 'krupp' },
            { title: 'Mercator', value: 'merc' },
            { title: 'Nordmetall', value: 'nord' },
            { title: 'Other', value: 'other' },
        ];
        /* state contains the currently selected location */
        this.state = {
            selectedOption: this.locations[0],
        };
    }

    render() {
        return (
            <Screen>
                <Header
                    statusBarProps={{ barStyle: 'light-content', backgroundColor: '#8e0000' }}
                    centerComponent={{ text: 'SELL', style: { color: '#ffffff' } }}
                    outerContainerStyles={{ backgroundColor: '#c62828' }}
                />
                <ScrollView>
                    <View style={{ padding: 20 }}>
                        <View style={{ padding: 10, backgroundColor: '#ffffff' }}>
                            <Button>
                                <Icon name="photo" />
                                <Text>UPLOAD A PICTURE</Text>
                            </Button>
                        </View>
                        <TextInput
                            placeholder="Post Name"
                        />
                        <TextInput
                            placeholder="Price"
                        />
                        <TextInput
                            style={{ height: 200, textAlignVertical: 'top' }}
                            multiline
                            numberOfLines={2}
                            placeholder="Description"
                        />
                        <View style={{ backgroundColor: '#ffffff' }}>
                            <DropDownMenu
                                options={this.locations}
                                selectedOption={this.state.selectedOption}
                                onOptionSelected={(car) => this.setState({ selectedOption: car })}
                                titleProperty="title"
                                valueProperty="value"
                            />
                        </View>
                        <Button style={{
                            marginTop: 20, paddingTop: 10, paddingBottom: 10, backgroundColor: '#c62828',
                        }}>
                            <Icon name="checkbox-on" style={{ color: '#ffffff' }} />
                            <Text style={{ color: '#ffffff' }}>SUBMIT</Text>
                        </Button>
                    </View>
                </ScrollView>
            </Screen>
        );
    }
}
