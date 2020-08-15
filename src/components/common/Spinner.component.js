import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import {
    UIActivityIndicator
} from 'react-native-indicators';

const Spinner = ({ size, spinnerStyle, color }) => {
    return(
        <View style={spinnerStyle}>
            <UIActivityIndicator size={size} color={color || "#041E42"} />
        </View>
    );
}

export { Spinner };