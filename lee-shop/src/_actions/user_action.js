import axios from 'axios';

import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {
    const request = axios.post('https://93b0-175-196-61-24.ngrok.io/login', dataToSubmit)
        .then(response => response.data)
console.log(request)
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {

    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request
    }
}



export function auth() {

    const request = axios.get('https://93b0-175-196-61-24.ngrok.io/login')
        .then(response => response.data)

    return {
        type: AUTH_USER,
        payload: request
    }
}


