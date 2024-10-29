import httpRequest from '~/components/utils/httpRequest';

export const getFeatured = async () => {
    try {
        const res = await httpRequest.get('products-client/featured');
        return res.data;
    } catch (error) {}
};
