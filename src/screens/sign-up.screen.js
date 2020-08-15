import React, { Component } from 'react';
import { View, Text, BackHandler, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button, Input, Spinner } from '../components';

const regexName = /^[a-zA-Z\s]{0,}$/;
const regexDn = /^[a-zA-Z]{0,}$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexMobile = /^[0]{1}[7]{1}[0-9]{1}[0-9]{7}$/;

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            cpwd: '',
            phone: '',
            display_name: '',
            nameError: '',
            nameBorder: '#d8d8d8',
            nameValid: false,
            emailError: '',
            emailBorder: '#d8d8d8',
            emailValid: false,
            dnError: '',
            dnBorder: '#d8d8d8',
            dnValid: false,
            mobileError: '',
            mobileBorder: '#d8d8d8',
            mobileValid: false,
            passwordError: '',
            passwordBorder: '#d8d8d8',
            passwordValid: false,
            cpError: '',
            cpBorder: '#d8d8d8',
            cpValid: false,
            registerError: ''
        };
    }

    onRegister() {
        const { name, email, password, cpwd, phone, display_name, nameValid, emailValid, dnValid, mobileValid, passwordValid, cpValid } = this.state;

        if (this.state.name == "") {
            this.setState({
                nameBorder: 'red',
                nameError: 'Name is required',
                nameValid: false
            });
        }

        if (this.state.email == "") {
            this.setState({
                emailBorder: 'red',
                emailError: 'Email is required',
                emailValid: false
            });
        }

        if (this.state.display_name == "") {
            this.setState({
                dnBorder: 'red',
                dnError: 'Display name is required',
                dnValid: false
            });
        }

        if (this.state.phone == "") {
            this.setState({
                mobileBorder: 'red',
                mobileError: 'Display name is required',
                mobileValid: false
            });
        }

        if (this.state.password == "") {
            this.setState({
                passwordBorder: 'red',
                passwordError: 'Password is required',
                passwordValid: false
            });
        }

        if (this.state.cpwd == "") {
            this.setState({
                cpBorder: 'red',
                cpError: 'Password is required',
                cpValid: false
            });
        }

        if (nameValid && emailValid && dnValid && mobileValid && passwordValid && cpValid) {
            // this.props.registerUser({ name, email, password, cpwd, phone, display_name });
        }
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    UNSAFE_componentWillMount() {
        // this.props.navigation.dispatch(DrawerActions.toggleDrawer());
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    onLogin() {
        this.props.navigation.navigate('login');
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner size={40} />;
        }

        return (
            <Button onPress={this.onRegister.bind(this)} style={styles.buttonStyle} textStyle={{ color: '#fff' }}>
                Sign Up
            </Button>
        );
    }

    onValidateName(name) {
        this.setState({ name: name, registerError: '' }, function () {
            var nameVal = regexName.test(this.state.name);
            if (this.state.name == "") {
                this.setState({
                    nameBorder: 'red',
                    nameError: 'Name is required',
                    nameValid: false
                });
            } else if (nameVal == false) {
                this.setState({
                    nameBorder: 'red',
                    nameError: "This does't look like a valid name",
                    nameValid: false
                });
            } else {
                this.setState({
                    nameBorder: '#d8d8d8',
                    nameError: "",
                    nameValid: true
                });
            }
        });
    }

    onValidateEmail(email) {
        this.setState({ email: email, registerError: '' }, function () {
            var emailVal = regexEmail.test(this.state.email);
            if (this.state.email == "") {
                this.setState({
                    emailBorder: 'red',
                    emailError: 'Email is required',
                    emailValid: false
                });
            } else if (emailVal == false) {
                this.setState({
                    emailBorder: 'red',
                    emailError: "This does't look like a valid email",
                    emailValid: false
                });
            } else {
                this.setState({
                    emailBorder: '#d8d8d8',
                    emailError: "",
                    emailValid: true
                });
            }
        });
    }

    onValidateDn(display_name) {
        this.setState({ display_name: display_name, registerError: '' }, function () {
            var dnVal = regexDn.test(this.state.display_name);
            if (this.state.display_name == "") {
                this.setState({
                    dnBorder: 'red',
                    dnError: 'Display name is required',
                    dnValid: false
                });
            } else if (dnVal == false) {
                this.setState({
                    dnBorder: 'red',
                    dnError: "This does't look like a valid display name",
                    dnValid: false
                });
            } else {
                this.setState({
                    dnBorder: '#d8d8d8',
                    dnError: "",
                    dnValid: true
                });
            }
        });
    }

    onValidateMobile(phone) {
        this.setState({ phone: phone, registerError: '' }, function () {
            var mobileVal = regexMobile.test(this.state.phone);
            if (this.state.phone == "") {
                this.setState({
                    mobileBorder: 'red',
                    mobileError: 'Display name is required',
                    mobileValid: false
                });
            } else if (mobileVal == false) {
                this.setState({
                    mobileBorder: 'red',
                    mobileError: "This does't look like a valid mobile number",
                    mobileValid: false
                });
            } else {
                this.setState({
                    mobileBorder: '#d8d8d8',
                    mobileError: "",
                    mobileValid: true
                });
            }
        });
    }

    onValidatePassword(password) {
        this.setState({ password: password, registerError: '' }, function () {
            if (this.state.password == "") {
                this.setState({
                    passwordBorder: 'red',
                    passwordError: 'Password is required',
                    passwordValid: false
                });
            } else if (this.state.password.length < 6) {
                this.setState({
                    passwordBorder: 'red',
                    passwordError: 'Password is too short',
                    passwordValid: false
                });
            } else {
                if (this.state.cpwd != "") {
                    if (this.state.cpwd !== this.state.password) {
                        this.setState({
                            passwordBorder: 'red',
                            passwordError: "Passwords don't match",
                            passwordValid: false
                        });
                    } else {
                        this.setState({
                            passwordBorder: '#d8d8d8',
                            passwordError: '',
                            passwordValid: true
                        });
                    }
                } else {
                    this.setState({
                        passwordBorder: '#d8d8d8',
                        passwordError: '',
                        passwordValid: true
                    });
                }
            }
        });
    }

    onValidateCp(cpwd) {
        this.setState({ cpwd: cpwd, registerError: '' }, function () {
            if (this.state.cpwd == "") {
                this.setState({
                    cpBorder: 'red',
                    cpError: 'Password is required',
                    cpValid: false
                });
            } else if (this.state.cpwd.length < 6) {
                this.setState({
                    cpBorder: 'red',
                    cpError: 'Password is too short',
                    cpValid: false
                });
            } else {
                if (this.state.password != "") {
                    if (this.state.password !== this.state.cpwd) {
                        this.setState({
                            cpBorder: 'red',
                            cpError: "Passwords don't match",
                            cpValid: false
                        });
                    } else {
                        this.setState({
                            cpBorder: '#d8d8d8',
                            cpError: '',
                            cpValid: true
                        });
                    }
                } else {
                    this.setState({
                        cpBorder: '#d8d8d8',
                        cpError: '',
                        cpValid: true
                    });
                }
            }
        });
    }

    render() {
        return (
            <ScrollView style={styles.cardStyle} keyboardShouldPersistTaps={'always'}>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.textStyle}>SIGN UP</Text>
                </View>
                <View style={styles.subContainerStyle}>
                    <View style={styles.cardSectionStyle}>
                        <Input
                            label="NAME"
                            labelStyle={{ color: '#989898' }}
                            placeholder="Michael Knight"
                            placeholderTextColor="#DBDDDE"
                            onChangeText={name => this.onValidateName(name)}
                            value={this.state.name}
                            style={[styles.inputStyle, { borderColor: this.state.nameBorder }]}
                            secureTextEntry={false}
                            errorText={this.state.nameError}
                        />
                    </View>
                    <View style={styles.cardSectionStyle}>
                        <Input
                            label="EMAIL"
                            labelStyle={{ color: '#989898' }}
                            placeholder="email@gmail.com"
                            placeholderTextColor="#DBDDDE"
                            onChangeText={email => this.onValidateEmail(email)}
                            value={this.state.email}
                            style={[styles.inputStyle, { borderColor: this.state.emailBorder }]}
                            secureTextEntry={false}
                            errorText={this.state.emailError}
                        />
                    </View>
                    <View style={styles.cardSectionStyle}>
                        <Input
                            label="DISPLAY NAME"
                            labelStyle={{ color: '#989898' }}
                            placeholder="Mike"
                            placeholderTextColor="#DBDDDE"
                            onChangeText={display_name => this.onValidateDn(display_name)}
                            value={this.state.display_name}
                            style={[styles.inputStyle, { borderColor: this.state.dnBorder }]}
                            secureTextEntry={false}
                            errorText={this.state.dnError}
                        />
                    </View>
                    <View style={styles.cardSectionStyle}>
                        <Input
                            label="MOBILE NUMBER"
                            placeholder="077 555 5555"
                            onChangeText={phone => this.onValidateMobile(phone)}
                            value={this.state.phone}
                            secureTextEntry={false}
                            labelStyle={{ color: '#989898' }}
                            placeholderTextColor="#DBDDDE"
                            style={[styles.inputStyle, { borderColor: this.state.mobileBorder }]}
                            errorText={this.state.mobileError}
                        />
                    </View>
                    <View style={styles.cardSectionStyle}>
                        <Input
                            secureTextEntry={true}
                            label="PASSWORD"
                            placeholder="Password"
                            onChangeText={password => this.onValidatePassword(password)}
                            value={this.state.password}
                            labelStyle={{ color: '#989898' }}
                            placeholderTextColor="#DBDDDE"
                            style={[styles.inputStyle, { borderColor: this.state.passwordBorder }]}
                            errorText={this.state.passwordError}
                        />
                    </View>
                    <View style={styles.cardSectionStyle}>
                        <Input
                            secureTextEntry={true}
                            label="CONFIRM PASSWORD"
                            placeholder="Confirm Password"
                            onChangeText={cpwd => this.onValidateCp(cpwd)}
                            value={this.state.cpwd}
                            labelStyle={{ color: '#989898' }}
                            placeholderTextColor="#DBDDDE"
                            style={[styles.inputStyle, { borderColor: this.state.cpBorder }]}
                            errorText={this.state.cpError}
                        />
                    </View>
                    <Text style={styles.errorTextStyle}>
                        {this.state.registerError}
                    </Text>
                    <View style={styles.cardSectionStyle}>
                        {this.renderButton()}
                    </View>
                    <View style={styles.cardSectionStyle}>
                        <Text style={{ color: '#989898', textAlign: 'center' }}>--------     ALREADY REGISTERED?     --------</Text>
                        <Button onPress={this.onLogin.bind(this)} style={styles.buttonStyle} textStyle={{ color: '#fff' }}>
                            SIGN IN
                        </Button>
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
    textStyle: {
        fontFamily: 'ProximaNovaBold',
        fontSize: 30,
        alignSelf: 'flex-start',
        color: '#ffffff',
        marginTop: 15
    },
    cardStyle: {
        flex: 1,
        backgroundColor: '#2f65e1',
        padding: 20
    },
    cardSectionStyle: {
        // flex: 1,
        height: 100
    },
    inputStyle: {
        height: 40,
        borderWidth: 1,
        borderColor: '#d8d8d8',
        borderRadius: 20,
        paddingLeft: 10
    },
    subContainerStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 20,
        marginBottom: 50
    },
    buttonStyle: {
        backgroundColor: '#2f65e1',
        borderRadius: 20
    }
}

export default SignUp;