import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const addProduct = async (id) => {
    try {
        const res = await httpRequest.post(`products-client/cart/add/${id}`);
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
