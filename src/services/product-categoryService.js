import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const getProductsCategory = async (params) => {
    try {
        const res = await httpRequest.get('products-category', { params });
        return res.data;
    } catch (error) {
        error(error());
    }
};

export const AddProductsCategory = async (data) => {
    try {
        const res = await httpRequest.post('products-category/create', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const changeStatusProductCategory = async (id, status) => {
    try {
        const res = await httpRequest.patch(`products-category/change-status/${id}`, { status });
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const changeMultiProductCategory = async (data) => {
    try {
        const res = await httpRequest.patch('products-category/change-multi', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const deleteProductCategory = async (id) => {
    try {
        const res = await httpRequest.patch(`products-category/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const detailProductCategory = async (id) => {
    try {
        const res = await httpRequest.get(`products-category/detail/${id}`);
        return res.data;
    } catch (error) {
        error(error());
    }
};

export const editProductCategory = async (id, data) => {
    try {
        const res = await httpRequest.patch(`products-category/edit/${id}`, data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};
