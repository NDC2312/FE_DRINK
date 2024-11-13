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

export const order = async (user_id, userInfo) => {
    try {
        const res = await httpRequest.post(`checkout/order/${user_id}`, userInfo, { withCredentials: true });
        console.log(res);
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

// list order
export const getOrder = async (orderId) => {
    try {
        const res = await httpRequest.get(`order`);
        console.log(res);
        return res.data;
    } catch (error) {
        error(error());
    }
};

// change-status order
export const changeStatusOrder = async (id, status) => {
    try {
        const res = await httpRequest.patch(`order/change-status/${id}`, { status });
        console.log('res', res);
        return res.data;
    } catch (error) {
        error(error());
    }
};

// change-status order
export const cancelOrder = async (id, status) => {
    try {
        const res = await httpRequest.patch(`order/change-status/${id}`, { status });
        console.log('res', res);
        return res.data;
    } catch (error) {
        error(error());
    }
};
