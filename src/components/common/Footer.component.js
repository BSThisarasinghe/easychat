import React from 'react';
import { Text, View } from 'react-native';

const Footer = ({ title, children, style, textStyle }) => {
    return (
        <View style={[styles.buttonStyle, style]}>
            <Text style={styles.buttonTextStyle}>
                {title}
            </Text>
            <Text style={[styles.buttonTextStyle, textStyle]}>
                {children}
            </Text>
        </View>
    )
}


const styles = {
    buttonTextStyle: {
        fontFamily: 'ProximaNovaRegular',
        alignSelf: 'center',
        color: '#D8D9DB',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
    buttonStyle: {
        // flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        // marginLeft: 20,
        // marginRight: 20,
        borderRadius: 0
    }
}

export { Footer };