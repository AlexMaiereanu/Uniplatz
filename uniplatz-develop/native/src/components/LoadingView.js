import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Subtitle } from '@shoutem/ui';

function LoadingView() {
    return (
        <View style={{
            paddingVertical: 20,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
        }}>
            <ActivityIndicator size="large" />
            <Subtitle style={{ textAlign: 'center', marginBottom: 10 }}>Loading...</Subtitle>
        </View>
    );
}

export default LoadingView;
