import httpRequest from '~/components/utils/httpRequest';

export const getProductsCategory = async () => {
    try {
        const res = await httpRequest.get('products-client/products-category');
        return res.data;
    } catch (error) {
        error(error());
    }
};

export const detailProduct = async (slugProduct) => {
    try {
        console.log('oke', `products-client/detail/${slugProduct}`);
        const res = await httpRequest.get(`products-client/detail/${slugProduct}`);
        console.log(res);
        return res.data;
    } catch (error) {
        error(error());
    }
};
