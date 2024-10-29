import httpRequest from '~/components/utils/httpRequest';

export const getProductsCategory = async () => {
    try {
        const res = await httpRequest.get('products-client/products-category');
        return res.data;
    } catch (error) {
        error(error());
    }
};
