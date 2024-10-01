import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const getBlogs = async (params) => {
    try {
        const res = await httpRequest.get('blogs', { params });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const changeStatusBlogs = async (id, status) => {
    try {
        const res = await httpRequest.patch(`blogs/change-status/${id}`, status);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const changeMultiBlogs = async (data) => {
    try {
        const res = await httpRequest.patch('blogs/change-multi', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        console.log(error);
    }
};

export const deleteBlogs = async (id) => {
    try {
        const res = await httpRequest.patch(`blogs/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const addBlogs = async (params) => {
    try {
        const res = await httpRequest.post('blogs/create', params);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const detailBlogs = async (id) => {
    try {
        const res = await httpRequest.get(`blogs/detail/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {}
};

export const editBlogs = async (id, data) => {
    try {
        const res = await httpRequest.patch(`blogs/edit/${id}`, data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};
