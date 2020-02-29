import axios from 'axios';
import { AsyncStorage } from 'react-native';

const Axios = axios.create({
    baseURL: 'https://s4fe.herokuapp.com/',
    // headers: {Authorization: 'Bearer ' + authorization},
});

Axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('tokenData');
        console.log('token iz intercepta', token)
        if (token) {
            console.log('token iz if iz intercept', token)
            config.headers.Authorization = 'Token ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

Axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log('error axios', error.response);
        if (error.response.status === 401) {
            console.log('401 je');
            AsyncStorage.clear();
            // NavigationService.navigate('Login');
        }
        return Promise.reject(error);
    },
);

export {Axios};
