import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const getBlogsCategory = async (params) => {
    try {
        const res = await httpRequest.get('blogs-category', { params });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const changeStatusBlogsCategory = async (id, status) => {
    try {
        const res = await httpRequest.patch(`blogs-category/change-status/${id}`, status);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const changeMultiBlogsCategory = async (data) => {
    try {
        const res = await httpRequest.patch('blogs-category/change-multi', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteBlogsCategory = async (id) => {
    try {
        const res = await httpRequest.patch(`blogs-category/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const addBlogsCategory = async (params) => {
    try {
        const res = await httpRequest.post('blogs-category/create', params);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const detailBlogsCategory = async (id) => {
    try {
        const res = await httpRequest.get(`blogs-category/detail/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {}
};

export const editBlogsCategory = async (id, data) => {
    try {
        const res = await httpRequest.patch(`blogs-category/edit/${id}`, data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};
