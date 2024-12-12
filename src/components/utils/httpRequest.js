import axios from 'axios';
import cookie from 'react-cookies';

const httpRequest = axios.create({
    baseURL: 'http://be-drink.vercel.app/api/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để thêm token vào header
httpRequest.interceptors.request.use(
    (config) => {
        const token = cookie.load('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Interceptor để xử lý lỗi phản hồi
httpRequest.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                cookie.remove('token');
            }
        }
        return Promise.reject(error);
    },
);

export default httpRequest;
