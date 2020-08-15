import React, { Component } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import mockdata from './mock/data.json';
import URL from './constants.config';
//import promise from 'promise';
// var accessToken = mockdata.payloads.accessToken;
// var expTime = mockdata.payloads.exp;
var accessToken;
var expTime;
// Add a request interceptor
var axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async function (config) {
    // Do something before request is sent 
    //If the header does not contain the token and the url not public, redirect to login 
    accessToken = await AsyncStorage.getItem('@accessToken');
    expTime = await AsyncStorage.getItem('@expTime');
    var currentTime = new Date();
    // var mobile = mockdata.payloads.profile.msisdn;
    // var passcode = mockdata.payloads.profile.passcode;
    const passcode = await AsyncStorage.getItem('@passcode');
    const mobile = await AsyncStorage.getItem('@mobile');
    // var newTime = Date.parse(expTime);
    // var newTime = new Date(expTime.valueOf());
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"+newTime);
    // var empTime = mockdata.payloads.exp;

    console.log("Ddddddddddddddddd" + mobile + " " + passcode);
    console.log("exp Time: " + expTime);
    console.log("current Time: " + JSON.stringify(currentTime));
    console.log("Compare" + expTime > JSON.stringify(currentTime));
    // if(expTime >= currentTime){
    //     console.log("Not Expired token");
    // }else{
    //     console.log("Expired token");
    // }
    // //if token is found add it to the header
    if (accessToken && expTime > JSON.stringify(currentTime)) {
        if (config.method !== 'OPTIONS') {
            console.log("Not expired");
            config.headers['Content-Type'] = 'application/json';
            config.headers['Authorization'] = `bearer ${accessToken}`;
            // config.headers['Authorization'] = `bearer 2a179f4b-bf53-45dc-9fe4-41a120606871`;
            config.headers['Cache-Control'] = `no-cache`;
        }
    } else {
        console.log("expired");
        var bodyFormData = new FormData();
        bodyFormData.append('username', mobile);
        bodyFormData.append('password', passcode);
        bodyFormData.append('grant_type', 'password');
        if (JSON.stringify(currentTime) > expTime) {
            console.log("Exxxfsdkfsdfdkjds");
            axios({
                method: 'post',
                url: `${URL.URL_VAR}/api/oauth/oauth/token`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: bodyFormData
            }).then(async function (response) {
                //handle success
                // return response.data;
                console.log("respoooo: " + mobile + " " + response.data.expires_in);
                mockdata.payloads.accessToken = response.data.access_token;
                currentTime.setSeconds(currentTime.getSeconds() + (response.data.expires_in));
                mockdata.payloads.exp = currentTime;

                accessToken = response.data.access_token;

                await AsyncStorage.setItem('@accessToken', accessToken);
                await AsyncStorage.setItem('@expTime', JSON.stringify(currentTime));
                console.log("#####");
                console.log("accessToken: " + accessToken);
                console.log("#####");
            }).catch(function (response) {
                //handle error
                console.log("Error respoooo: " + response);
            });
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `bearer ${accessToken}`;
        config.headers['Cache-Control'] = `no-cache`;
        console.log('In interceptors' + JSON.stringify(config));
    }

    return config;
}, function (error) {
    // Do something with request error 
    //return promise.reject(error);
    return error;
});

export default axiosInstance;