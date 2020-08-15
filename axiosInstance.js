import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { URL } from './constants.config';

var auth;
var expTime;
var password;
// Add a request interceptor
var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async function (config) {
    // Do something before request is sent 
    //If the header does not contain the token and the url not public, redirect to login 
    var stringifiedToken = await AsyncStorage.getItem('auth');
    var stringifiedTime = await AsyncStorage.getItem('expTime');
    password = await AsyncStorage.getItem('password');
    auth = JSON.parse(stringifiedToken);
    expTime = JSON.parse(stringifiedTime);
    var currentTime = new Date();

    console.log("###1");
    console.log(auth.token);
    console.log(new Date(expTime));
    console.log(new Date(currentTime));
    console.log(new Date(expTime) > new Date(currentTime));
    console.log("###1");


    if (auth.token && new Date(expTime) > new Date(currentTime)) {
        if (config.method !== 'OPTIONS') {
            console.log("Not expired");
            config.headers['Content-Type'] = 'application/json';
            config.headers['Accept'] = '*/*';
            config.headers['Authorization'] = `bearer ${auth.token}`;
            config.headers['Cache-Control'] = `no-cache`;
        }
    } else {
        console.log("expired");

        var requestData = {
            "email": auth.user.email,
            "password": password
        }

        if (currentTime > expTime) {
            axios({
                method: 'post',
                url: `${URL}/users/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: requestData
            }).then(async function (response) {
                //handle success
                currentTime.setSeconds(currentTime.getSeconds() + 3600);
                auth = response.data;

                await AsyncStorage.setItem('auth', JSON.stringify(auth));
                await AsyncStorage.setItem('expTime', JSON.stringify(currentTime));
            }).catch(function (error) {
                //handle error
                console.log("Error respoooo: " + error);
            });
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `bearer ${auth.token}`;
        config.headers['Cache-Control'] = `no-cache`;
    }

    return config;
}, function (error) {
    // Do something with request error 
    //return promise.reject(error);
    return error;
});

export default axiosInstance;