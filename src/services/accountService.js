import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const login = async (data) => {
    try {
        const res = await httpRequest.post('account/login', data);
        return res.data;
    } catch (error) {}
};

export const myAccount = async () => {
    try {
        const res = await httpRequest.get('account/my-account');
        return res.data;
    } catch (error) {}
};

export const getAccount = async (params) => {
    try {
        const res = await httpRequest.get('account');
        return res.data;
    } catch (error) {}
};

export const AddAccount = async (data) => {
    try {
        const res = await httpRequest.post('account/register', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
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

export const deleteAccount = async (id) => {
    try {
        const res = await httpRequest.patch(`account/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};

export const detailAccount = async (id) => {
    try {
        const res = await httpRequest.get(`account/detail/${id}`);
        return res.data;
    } catch (error) {}
};

export const editAccount = async (id, data) => {
    try {
        const res = await httpRequest.patch(`account/edit/${id}`, data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};
