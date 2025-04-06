import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const getProducts = async (params) => {
    try {
        const res = await httpRequest.get('products-client', { params });
        return res.data;
    } catch (error) {}
};

export const getProductsCategory = async () => {
    try {
        const res = await httpRequest.get('products-client/products-category');
        return res.data;
    } catch (error) {}
};

export const getProductsCategorySlug = async (slug) => {
    try {
        const res = await httpRequest.get(`products-client/category/${slug}`);
        return res.data;
    } catch (error) {}
};

export const detailProduct = async (slugProduct) => {
    try {
        const res = await httpRequest.get(`products-client/detail/${slugProduct}`);

        return res.data;
    } catch (error) {}
};

export const addReview = async (data) => {
    try {
        const res = await httpRequest.post('review/create', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};

export const getReview = async () => {
    try {
        const res = await httpRequest.get('review');
        return res.data;
    } catch (error) {}
};

export const removeReview = async (review_id) => {
    try {
        const res = await httpRequest.patch(`review/delete/${review_id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};

export const getReviewAll = async (id) => {
    try {
        const res = await httpRequest.get(`review/getAllById/${id}`);

        return res.data;
    } catch (error) {}
};
