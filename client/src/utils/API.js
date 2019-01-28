import axios from 'axios';

const headers = {
    'Content-Type': 'application/json'
};
const burl = "http://localhost:8000";

export default {

    //Profile
    login: function (email, password) {
        return axios.post(burl + '/user/login', {
            'email': email,
            'password': password
        }, {
            headers: headers
        })
    },
    signup: function (send) {
        return axios.post(burl + '/user/signup', send, {headers: headers})
    },

    changeProfile: function (send) {
        return axios.post(burl + '/user/settings/modify', send, {headers: headers})
    },

    changeEmail: function (send) {
        return axios.post(burl + '/user/change/Email', send, {headers: headers})
    },

    changePassword: function (send) {
        return axios.post(burl + '/user/change/Password', send, {headers: headers})
    },

    resetPassword: function (send) {
        return axios.post(burl + '/user/reset', send, {headers: headers})
    },

    applyCompany: function (send) {
        return axios.post(burl + '/user/applyCompany', send, {headers: headers})
    },

    isCompany: function (send) {
        return axios.post(burl + '/user/isCompany', send, {headers: headers})
    },

    getSub: function (send) {
        return axios.post(burl + '/subscriptions/get', send, {headers: headers})
    },
    createSub: function (send) {
        return axios.post(burl + '/subscriptions/create', send, {headers: headers})
    },
    isAuth: function () {
        return (localStorage.getItem('token') !== null);
    },
    getProfile: function (send) {
        return axios.post(burl + '/user/getProfile', send, {headers: headers})
    },
    logout: function () {
        localStorage.clear();
    }
}