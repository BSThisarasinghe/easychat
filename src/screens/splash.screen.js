import React, { Component } from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { Logo, Footer } from '../components';

class Splash extends Component {

    componentDidMount() {
        setTimeout(() => {
            const { navigate } = this.props.navigation;
            navigate('login');
        }, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#2f65e1" barStyle={'light-content'} />
                <Logo />
                <Footer textStyle={styles.textStyle}>
                    beta 1{"\n"}
                    Developed by Buwaneka Sudheera
                </Footer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    textStyle: {
        textAlign: 'center'
    }
});

export default Splash;