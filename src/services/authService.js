import axios from 'axios';

import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const register = async (data) => {
    try {
        const res = await httpRequest.post('auth/register', data);
        if (res.data.code === 200) {
            if (success(res.data.message)) {
            }
        } else {
            error(res.data.message);
        }
        return res.data;
    } catch (error) {}
};

export const login = async (data) => {
    try {
        const res = await httpRequest.post('auth/login', data);
        console.log('res.data', res.data);
        return res.data;
    } catch (error) {}
};

export const googleAuth = async (token) => {
    const res = await httpRequest.post('auth/google', { token });
    console.log(res);
    return res.data;
};

export const myAuth = async (tokenAuth) => {
    try {
        const res = await axios.get('https://be-drink.vercel.app/api/v1/auth/myAuth', {
            headers: { Authorization: `Bearer ${tokenAuth}`, 'Content-Type': 'application/json' },
        });
        return res.data;
    } catch (error) {}
};

export const getAuth = async (params) => {
    try {
        const res = await httpRequest.get('auth');
        return res.data;
    } catch (error) {}
};

export const changeStatusAccount = async (id, status) => {
    try {
        const res = await httpRequest.patch(`account/change-status/${id}`, { status });
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};

export const changeMultiAccount = async (data) => {
    try {
        const res = await httpRequest.patch('account/change-multi', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        console.log(error());
    }
};

export const deleteAuth = async (id) => {
    try {
        const res = await httpRequest.patch(`auth/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};

export const detailAuth = async (id) => {
    try {
        const res = await httpRequest.get(`auth/detail/${id}`);
        return res.data;
    } catch (error) {}
};

export const editAuth = async (id, data) => {
    try {
        const res = await httpRequest.patch(`auth/edit/${id}`, data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};

export const forgetPassword = async (email) => {
    try {
        const res = await httpRequest.post('auth/password/forgot', { email });
        console.log(res);

        return res.data;
    } catch (error) {}
};

export const otpPassword = async (data) => {
    try {
        const res = await httpRequest.post(`auth/password/otp`, data);
        return res.data;
    } catch (error) {}
};

export const resetPassword = async (data) => {
    try {
        const res = await httpRequest.post(`auth/password/reset`, data);
        return res.data;
    } catch (error) {}
};
