import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const getProducts = async (params) => {
    try {
        const res = await httpRequest.get('products', { params });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const changeStatusProduct = async (id, status) => {
    try {
        const res = await httpRequest.patch(`products/change-status/${id}`, status);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const changeMultiProduct = async (data) => {
    try {
        const res = await httpRequest.patch('products/change-multi', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = async (id) => {
    try {
        const res = await httpRequest.patch(`products/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const addProduct = async (params) => {
    try {
        const res = await httpRequest.post('products/create', params);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const detailProduct = async (id) => {
    try {
        const res = await httpRequest.get(`products/detail/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {}
};

export const editProduct = async (id, data) => {
    try {
        const res = await httpRequest.patch(`products/edit/${id}`, data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};
