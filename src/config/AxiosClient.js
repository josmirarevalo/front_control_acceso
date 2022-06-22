
import axios from 'axios';
import {getAccessToken, getRefreshToken, setToken} from './SessionStorage';
import {history} from '../config/History';
import Swal from 'sweetalert2';

const AxiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`
});

// Add a request interceptor
AxiosClient.interceptors.request.use(
    config => {
        const token = getAccessToken();
        if (token) {
            config.headers['authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    });
 
 
// Add a response interceptor
AxiosClient.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;
 
    if (error.response.status === 401) {
        Swal.fire({
            icon:'error',
            title: 'Caducidad de Sesión',
            text: 'Por Favor haga login nuevamente'
        });
        history.push('/login');
        return Promise.reject(error);
    }
 
    if (error.response.status === 401 && !originalRequest._retry) {
 
        originalRequest._retry = true;
        const refreshToken = getRefreshToken();
        return AxiosClient.post('/auth/token',
            {
                "refresh_token": refreshToken
            })
            .then(res => {
                if (res.status === 201) {
                    setToken(res.data);
                    AxiosClient.defaults.headers.common['authorization'] = 'Bearer ' + getAccessToken();
                    return AxiosClient(originalRequest);
                }
            })
    }
    return Promise.reject(error);
 });

//AxiosClient.defaults.headers.common['authorization'] = sessionStorage.getItem("jwtToken");

export default AxiosClient;