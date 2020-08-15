import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logo = ({ onPress, children, style, textStyle }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo.png')}
                style={{ width: 300, height: 150 }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    nextStyle: {
        width: 500,
        height: 90
    }
});

export { Logo };