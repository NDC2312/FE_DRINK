import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const getProducts = async (params) => {
    try {
        const res = await httpRequest.get('supplier');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const changeStatusProduct = async (id, status) => {
    try {
        const res = await httpRequest.patch(`ingredient/change-status/${id}`, { status });
        console.log(status);

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
        const res = await httpRequest.patch('ingredient/change-multi', data);
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
        const res = await httpRequest.patch(`ingredient/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const addProduct = async (data) => {
    try {
        const res = await httpRequest.post('supplier/create', data);
        console.log(res);
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
        const res = await httpRequest.get(`ingredient/detail/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {}
};

export const editProduct = async (id, data) => {
    try {
        const res = await httpRequest.patch(`ingredient/edit/${id}`, data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};
