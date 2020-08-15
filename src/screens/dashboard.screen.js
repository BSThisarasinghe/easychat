import _ from 'lodash';
import React, { Component, createRef } from 'react';
import { View, Text, Dimensions, FlatList, Image, UIManager, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import Moment, { months } from 'moment';
import { Button, Header, ButtonImage, Spinner, Confirm } from '../cards';
import { userFetch, groupFetch, logOutUser } from '../../actions';
import mockdata from '../../mock/mockdata.json';
// import Team from '../assets/images/team.svg';

const { width, height } = Dimensions.get('window');

const flatlist = createRef();

class Home extends Component {

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

    UNSAFE_componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    createGroup() {
        this.props.navigation.navigate('createGroup');
    }

    sendMessage() {
        this.props.navigation.navigate('sendMessage');
    }

    onPressIcon() {
        // console.log("Press");
        this.props.navigation.toggleDrawer();
    }

    onPressMenu() {
        this.setState({ showModal: true });
    }

    getUserDetails() {
        this.props.userFetch();
        // console.log("USER LOG: " + JSON.stringify(this.props.userdata[0]));
        mockdata.payload.approved = this.props.userdata[0].approved;
        console.log("Approved status: " + this.props.userdata[0].approved);
        this.setState({ display_name: this.props.userdata[0].display_name, mobile: this.props.userdata[0].phone, name: this.props.userdata[0].name, approved: this.props.userdata[0].approved });
    }

    getGroups() {
        this.props.groupFetch();
        this.setState({ listData: this.props.listData.reverse() });
        // console.log("GROUP LOG: " + JSON.stringify(this.props.listData[0].title));
    }

    componentDidMount() {
        this.getUserDetails();
        this.getGroups();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.logoutSuccess == true) {
            this.props.navigation.navigate('login');
        }
        mockdata.payload.approved = nextProps.userdata[0].approved;
        this.setState({ display_name: nextProps.userdata[0].display_name, mobile: nextProps.userdata[0].phone, listData: nextProps.listData.reverse(), name: nextProps.userdata[0].name, approved: nextProps.userdata[0].approved });
    }

    onPressGroup(id) {
        // console.log(id);
        this.props.navigation.navigate('editGroup', { id: id });
    }

    renderListItem = ({ item }) => {
        // console.log(item);
        return (
            <View style={{ padding: 3, marginBottom: 10 }}>
                <ButtonImage onPress={() => this.onPressGroup(item.uid)} style={{ flex: 1, borderWidth: 1, padding: 20, borderColor: '#d8d8d8', borderRadius: 5, flexDirection: 'row', alignItems: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: 25, height: 25, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 14, borderColor: '#d8d8d8' }}>
                            <Image
                                source={require('../assets/images/team.png')}
                                style={{ width: 15, height: 15 }}
                            />
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={styles.listTitleStyle}>{item.title}</Text>
                            <Text style={styles.listDateStyle}>Created {Moment(item.createtime).fromNow()}</Text>
                        </View>
                    </View>
                    <Image
                        source={require('../assets/images/next.png')}
                        style={{ width: 15, height: 15 }}
                    />
                </ButtonImage>
            </View>
        );
    }

    onScrollToTop(e) {
        // console.log("Scroll: " + e.nativeEvent.contentOffset.y);
        if (e.nativeEvent.contentOffset.y < 30) {
            this.setState({ showHeader: true });
        } else {
            this.setState({ showHeader: false });
        }
    }

    renderSubHeader() {
        if (this.state.showHeader) {
            return (
                <View style={{ height: 100, backgroundColor: '#2f65e1', padding: 30 }}>
                    <Text style={styles.titleStyle}>DASHBOARD</Text>
                    <Text style={styles.subTextStyle}>{this.state.mobile}</Text>
                </View>
            )
        }
    }

    renerCaption() {
        if (mockdata.payload.approved) {
            return (
                <View style={styles.emptyCartContainerStyle}>
                    <Image
                        source={require('../assets/images/cart.png')}
                        style={{ width: 120, height: 120, marginBottom: 20 }}
                    />
                    <Text style={styles.emptyCaptionStyle}>Oops, your group list is empty. {"\n"}Click the menu to create one.</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.emptyCartContainerStyle}>
                    <Image
                        source={require('../assets/images/waiting.png')}
                        style={{ width: 120, height: 120, marginBottom: 20 }}
                    />
                    <Text style={[styles.emptyCaptionStyle, { textAlign: 'center' }]}>Stay on us until{"\n"} your account is approved.</Text>
                </View>
            )
        }
    }

    renderList() {
        if (this.props.loading) {
            return (
                <View style={styles.spinnerContainerStyle}>
                    <Spinner size={40} />
                </View>
            );
        } else {
            if (this.state.listData.length == 0) {
                return (
                    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                        {this.renerCaption()}
                    </View>
                )
            } else {
                return (
                    <View style={{ flex: 1 }}>
                        <FlatList
                            ref={flatlist}
                            data={this.state.listData}
                            renderItem={this.renderListItem}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                            scrollEnabled={true}
                            onScroll={e => this.onScrollToTop(e)}
                            style={{ backgroundColor: '#ffffff', padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                        />
                    </View>
                )
            }
        }
    }

    onLogoutAccept() {
        this.setState({ showModal: false }, function () {
            this.props.logOutUser();
        });
    }

    onLogoutTouch() {
        this.setState({ showModal: false });
    }

    renderHeader() {
        if (this.props.loading) {
            return (
                <View style={[styles.headerStyle, { height: 65, paddingLeft: 10, position: 'relative', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}>
                    <Spinner size={20} color={'#fff'} />
                </View>
            );
        } else {
            if (mockdata.payload.approved) {
                return (
                    <Header
                        screen={'home'}
                        headerText={this.state.display_name}
                        addressText={this.state.name}
                        onPress={this.onPressIcon.bind(this)}
                        onPressMenu={this.onPressMenu.bind(this)}
                        headerStyle={styles.headerStyle}
                        addressStyle={{ color: '#f2f2f2' }}
                        textStyle={{ color: '#ffffff' }}
                    />
                )
            } else {
                return (
                    <Header
                        screen={'home'}
                        headerText={"PENDING"}
                        addressText={"Your account is in pending mode"}
                        onPressMenu={this.onPressMenu.bind(this)}
                        headerStyle={styles.headerStyle}
                        addressStyle={{ color: '#f2f2f2' }}
                        textStyle={{ color: '#ffffff' }}
                    />
                )
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 60 }}>
                    {this.renderHeader()}
                </View>
                {this.renderSubHeader()}
                <View style={{ flex: 1, backgroundColor: '#2f65e1' }}>
                    {this.renderList()}
                    <Confirm
                        visible={this.state.showModal}
                        onAccept={this.onLogoutAccept.bind(this)}
                        onTouch={this.onLogoutTouch.bind(this)}
                        onCancel={this.onLogoutTouch.bind(this)}
                        buttonText={"Yes"}
                        cancelButtonText={"Cancel"}
                        header={"SIGN OUT"}
                        containerStyle={{ justifyContent: 'flex-end' }}
                    >
                        <Text>Are you sure you want to logout?</Text>
                    </Confirm>
                </View>
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

const mapStateToProps = state => {
    const userdata = _.map(state.auth, (val, uid) => {
        return { ...val, uid };
    });

    const listData = _.map(state.grp.listData, (val, uid) => {
        return { ...val, uid };
    });

    return { userdata, listData, loading: state.grp.loading, logoutSuccess: state.auth.logoutSuccess };
    // return {
    //     userdata: state.auth
    // }
}

export default connect(mapStateToProps, { userFetch, groupFetch, logOutUser })(Home);