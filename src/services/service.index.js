import axios from 'axios';
import axiosInstance from '../../axiosInstance';
import { URL } from '../../constants.config';

const postRegister = (data) => {
    return axios({
        method: 'post',
        url: `${URL}/users/signup`,
        data: data
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

const postLogin = (data) => {
    return axios({
        method: 'post',
        url: `${URL}/users/login`,
        data: data
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

const getAllChats = () => {
    return axiosInstance({
        method: 'get',
        url: `${URL}/sessions`
    }).then(function (response) {
        return response;
    }).catch(function (response) {
        return response;
    });
}

export {
    postRegister,
    postLogin,
    getAllChats
};