// import _ from 'lodash';
import React, { Component, createRef } from 'react';
import { View, Text, Dimensions, FlatList, Image, UIManager, LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
// const { width, height } = Dimensions.get('window');

// const flatlist = createRef();

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 1,
            mapWidth: Dimensions.get('window').width - 30,
            latitude: 6.927079,
            longitude: 79.861244,
            radius: 2000,
            display_name: '',
            mobile: '',
            name: '',
            listData: [],
            showHeader: true,
            loading: true,
            showModal: false,
            approved: false
        };
    }

    async componentDidMount() {
        var stringifiedToken = await AsyncStorage.getItem('auth');
        var stringifiedTime = await AsyncStorage.getItem('expTime');

        console.log("Dashboard");
        console.log(stringifiedToken);
        console.log(stringifiedTime);
        console.log("Dashboard");

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Dashboard</Text>
            </View>
        );
    }
}

const styles = {
    headerStyle: {
        backgroundColor: '#2f65e1'
    },
    titleStyle: {
        color: '#ffffff',
        fontSize: 25,
        fontFamily: 'ProximaNovaBold',
    },
    subTextStyle: {
        color: '#82a7ff',
        fontSize: 14,
        fontFamily: 'ProximaNovaRegular',
    },
    spinnerContainerStyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listTitleStyle: {
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: 'ProximaNovaRegular',
        color: '#333333'
    },
    listDateStyle: {
        paddingLeft: 10,
        fontSize: 10,
        fontFamily: 'ProximaNovaRegular',
        color: '#737373',
        paddingLeft: 10
    },
    emptyCaptionStyle: {
        fontSize: 15,
        fontFamily: 'ProximaNovaBold',
        color: '#2f65e1',
    },
    emptyCartContainerStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
        alignItems: 'center'
    }
}

export default Dashboard;