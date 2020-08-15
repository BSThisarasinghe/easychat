import React, { Component } from 'react';
import { View, Text, BackHandler, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Spinner, Confirm } from '../cards';
import { logOutUser, passwordChanged, loginUser } from '../../actions';

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', showModal: true };
    }

    onLogoutAccept() {
        this.props.logOutUser();
        // console.log("Logout: "+JSON.stringify(this.props.navigation.navigate));
        // this.props.navigation.navigate('login');
    }

    onLogoutCancel() {
        this.props.navigation.navigate('home');
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.user == null) {
            this.props.navigation.navigate('login');
        }
    }

    render() {
        return (
            <View style={styles.cardStyle}>
                <TouchableHighlight style={[styles.containerStyle]} onPress={this.onLogoutCancel.bind(this)}>
                    <View style={[styles.subContainerStyle]}>
                        <View style={[styles.headerStyle]}>
                            <Text style={styles.headerTextStyle}>Sign out</Text>
                        </View>
                        <View style={[styles.cardSectionStyle]}>
                            <Text>Are you sure you want to sign out?</Text>
                        </View>
                        <View style={[styles.buttonContainerStyle]}>
                            <Button onPress={this.onLogoutCancel.bind(this)} style={[styles.cancelButtonStyle]} textStyle={[{ color: '#8c8c8c' }]} colors={['transparent', 'transparent']}>
                                No
                            </Button>
                            <Button onPress={this.onLogoutAccept.bind(this)} style={[styles.buttonStyle]} textStyle={[{ color: '#041E42' }]} colors={['transparent', 'transparent']}>
                                Yes
                            </Button>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        flex: 1
    },
    cardSectionStyle: {
        // justifyContent: 'center',
        backgroundColor: '#fff',
        height: 120,
        padding: 20,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textStyle: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'flex-end',
        padding: 8
    },
    subContainerStyle: {
        backgroundColor: '#fff',
        borderRadius: 14
    },
    buttonContainerStyle: {
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    cancelButtonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        marginRight: 10,
        borderColor: '#d8d8d8',
        borderRadius: 14,
        height: 30,
        width: '50%'
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#041E42',
        borderRadius: 14,
        height: 30,
        width: '50%'
    },
    gradientStyle: {
        borderRadius: 14
    },
    headerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#041E42',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },
    headerTextStyle: {
        color: '#fff',
        fontFamily: 'ProximaNovaRegular',
        fontSize: 14,
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { logOutUser, passwordChanged, loginUser })(Logout);