import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import { Icon } from '@shoutem/ui/components/Icon';
import BuyView from './buy';
import CreateView from './create';
import SellingView from './selling';
import SettingsView from './settings';
import MessageNavigator from './messageNavigator';

const HomeNavigator = TabNavigator(
    {
        Buy: {
            screen: BuyView,
            navigationOptions: {
                tabBarLabel: 'Buy',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="cart" style={{ color: tintColor }} />
                ),
            },
        },
        Sell: {
            screen: SellingView,
            navigationOptions: {
                tabBarLabel: 'Sell',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="products" style={{ color: tintColor }} />
                ),
            },
        },
        Create: {
            screen: CreateView,
            navigationOptions: {
                tabBarLabel: 'Create',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="plus-button" style={{ color: tintColor }} />
                ),
            },
        },
        Messages: {
            screen: MessageNavigator,
            navigationOptions: {
                tabBarLabel: 'Chat',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="comment" style={{ color: tintColor }} />
                ),
            },
        },
        Settings: {
            screen: SettingsView,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="settings" style={{ color: tintColor }} />
                ),
            },
        },
    },
    {
        animationEnabled: true,
        tabBarOptions: {
            ...Platform.select({
                ios: {
                    activeTintColor: '#c62828',
                },
                android: {
                    showIcon: true,
                    showLabel: false,
                    indicatorStyle: {
                        backgroundColor: '#c62828',
                    },
                    activeTintColor: '#c62828',
                    inactiveTintColor: '#c2c2c2',
                    labelStyle: {
                        fontSize: 8,
                    },
                    style: {
                        backgroundColor: '#fff',
                    },
                },
            }),
        },
        tabBarPosition: 'bottom',
    },
);

export default HomeNavigator;
