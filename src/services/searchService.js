import httpRequest from '~/components/utils/httpRequest';

export const search = async (searchValue) => {
    try {
        const res = await httpRequest.get(`products-client/search?name=${searchValue}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
