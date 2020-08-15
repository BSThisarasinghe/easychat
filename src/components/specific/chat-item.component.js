import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ChatItem = ({ onPress, chatItem, style, textStyle, colors, gradientStyle, disabled }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonStyle, style]} disabled={disabled}>
            <Text style={[styles.buttonTextStyle, textStyle]}>
                {chatItem}
            </Text>
        </TouchableOpacity>
    )
}


const styles = {
    buttonTextStyle: {
        alignSelf: 'center',
        color: '#000',
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        fontFamily: 'ProximaNovaRegular',
        fontSize: 14
    },
    buttonStyle: {
        // flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        // marginLeft: 20,
        // marginRight: 20,
        borderRadius: 0
    },
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }
}

export { ChatItem };