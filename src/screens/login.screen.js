import React, { Component } from 'react';
import { View, Text, BackHandler, KeyboardAvoidingView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Input, Spinner } from '../components';
import { postLogin } from '../services/service.index';

const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            emailBorder: '#d8d8d8',
            passwordBorder: '#d8d8d8',
            emailValid: false,
            passwordValid: false,
            auth: {
                "message": "",
                "token": "",
                "user": {
                    "id": 0,
                    "name": "",
                    "email": "",
                    "status": 0
                }
            },
            autherror: ''
        };
    }

    onChangeEmail(email) {
        this.setState({
            email
        });
    }

    onChangePassword(password) {
        this.setState({
            password
        });
    }

    async storeAuthData(auth, expTime) {
        try {
            await AsyncStorage.setItem('auth', auth);
            await AsyncStorage.setItem('expTime', expTime);
        } catch (e) {
            // saving error
        }
    }

    async storePassword(password) {
        try {
            await AsyncStorage.setItem('password', password);
        } catch (e) {
            // saving error
        }
    }    

    async onLogin() {
        const { email, password, emailValid, passwordValid } = this.state;
        console.log("onLogin");
        if (this.state.email == "") {
            await this.setState({
                emailBorder: 'red',
                emailError: 'Email is required',
                emailValid: false
            });
        }

        if (this.state.password == "") {
            await this.setState({
                passwordBorder: 'red',
                passwordError: 'Password is required',
                passwordValid: false
            });
        }

        var requestData = {
            "email": this.state.email,
            "password": this.state.password
        }

        postLogin(requestData).then((data) => {
            console.log(JSON.stringify(data));
            if (data.status === 200) {
                this.storePassword(this.state.password);
                this.setState({
                    email: '',
                    password: '',
                    auth: data.data
                }, async function () {
                    var currentTime = new Date();
                    currentTime.setSeconds(currentTime.getSeconds() + 3600);
                    
                    await this.storeAuthData(JSON.stringify(this.state.auth), JSON.stringify(currentTime));
                    this.props.navigation.navigate('dashboard');
                });
                // this.props.navigation.navigate('login');
            }
        });

        // console.log(user);
        // if(user !== null){
        //     this.props.navigation.navigate('Profile');
        // }
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size={40} />;
        }

        return (
            <Button onPress={this.onLogin.bind(this)} style={styles.buttonStyle} textStyle={{ color: '#fff' }}>
                SIGN IN
            </Button>
        );
    }

    registerUser() {
        this.props.navigation.navigate('register');
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#2f65e1' }} keyboardShouldPersistTaps={'always'}>
                <View style={styles.cardStyle}>
                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <Text style={styles.titleStyle}>SIGN IN</Text>
                    </View>
                    <View style={styles.subContainerStyle}>
                        <View style={styles.cardSectionStyle}>
                            <Input
                                label="EMAIL"
                                labelStyle={{ color: '#989898' }}
                                placeholder="email@gmail.com"
                                placeholderTextColor="#DBDDDE"
                                onChangeText={email => this.onChangeEmail(email)}
                                value={this.state.email}
                                style={[styles.inputStyle, { borderColor: this.state.emailBorder }]}
                                secureTextEntry={false}
                                errorText={this.state.emailError}
                            />
                        </View>
                        <View style={styles.cardSectionStyle}>
                            <Input
                                secureTextEntry={true}
                                label="PASSWORD"
                                labelStyle={{ color: '#989898' }}
                                placeholder="Password"
                                placeholderTextColor="#DBDDDE"
                                onChangeText={password => this.onChangePassword(password)}
                                style={[styles.inputStyle, { borderColor: this.state.passwordBorder }]}
                                value={this.state.password}
                                errorText={this.state.passwordError}
                            />
                        </View>
                        <Text style={styles.errorTextStyle}>
                            {this.state.autherror}
                        </Text>
                        <View style={styles.cardSectionStyle}>
                            {this.renderButton()}
                        </View>
                        <View style={styles.cardSectionStyle}>
                            <Text style={{ color: '#989898', textAlign: 'center' }}>--------     NOT REGISTERED?     --------</Text>
                            <Button
                                onPress={this.registerUser.bind(this)}
                                style={styles.buttonStyle}
                                textStyle={{ color: '#fff' }}>
                                Create an account
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontFamily: 'ProximaNovaRegular',
        fontSize: 12,
        alignSelf: 'center',
        color: 'red',
        textAlign: 'center',
        marginBottom: 10
    },
    containerStyle2: {
        marginTop: 50,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 175,
        width: 175
    },
    cardStyle: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end'
    },
    subContainerStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 20
    },
    cardSectionStyle: {
        // flex: 1,
        height: 100,
        flexDirection: 'column'
    },
    inputStyle: {
        height: 40,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        borderRadius: 20,
        paddingLeft: 10
    },
    titleStyle: {
        fontFamily: 'ProximaNovaBold',
        fontSize: 30,
        color: '#ffffff'
    },
    buttonStyle: {
        backgroundColor: '#2f65e1',
        borderRadius: 20
    }
}

export default Login;