// import _ from 'lodash';
import React, { Component, createRef } from 'react';
import { View, Text, Dimensions, FlatList, Image, UIManager, LayoutAnimation } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { getAllChats } from '../services/service.index';
import { ChatItem } from '../components';

// const flatlist = createRef();

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: {},
            allChats: []
        };
    }

    setAllChats() {
        getAllChats().then((response) => {
            if (response.status === 200) {
                this.setState({
                    allChats: response.data.sessions
                }, function () {
                    console.log(JSON.stringify(this.state.allChats));
                });
            }
        });
    }

    componentDidMount() {
        this.setAllChats();
    }

    renderListItem = ({ item }) => {
        return (
            <ChatItem
                chatItem={item.contact.userData.name}
            />
        );
    }

    renderChatList() {
        return (
            <FlatList
                data={this.state.allChats}
                renderItem={this.renderListItem}
                keyExtractor={(item, index) => index.toString()}
                extraData={this.state}
                scrollEnabled={true}
                initialNumToRender={8}
            // ref={ref => this.scrollView = ref}
            // onEndReached={this.loadMoreCampaigns}
            />
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.renderChatList()}
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