import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

// quantity
export const totalQuantity = async () => {
    try {
        const res = await httpRequest.get('cart/cartId', { withCredentials: true });
        return res.data;
    } catch (error) {
        error(error());
    }
};

// get cart
export const getCart = async () => {
    try {
        const res = await httpRequest.get('cart', { withCredentials: true });
        return res.data;
    } catch (error) {
        error(error());
    }
};

export const addProduct = async (productId, quantity) => {
    try {
        const res = await httpRequest.post(`cart/add/${productId}`, { quantity }, { withCredentials: true });
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const removeProduct = async (productId) => {
    try {
        const res = await httpRequest.get(`cart/delete/${productId}`, { withCredentials: true });
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const order = async (user_id, userInfo) => {
    try {
        const res = await httpRequest.post(`checkout/order/${user_id}`, userInfo, { withCredentials: true });
        if (res.status === 200) {
            success('Đặt hàng thành công');
            return res.data;
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const orderSuccess = async (orderId) => {
    try {
        const res = await httpRequest.get(`checkout/order/success/${orderId}`);
        return res.data;
    } catch (error) {
        error(error());
    }
};
