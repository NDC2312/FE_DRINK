import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const getAdvise = async (params = {}) => {
    try {
        const res = await httpRequest.get('customer', { params });
        return res.data;
    } catch (error) {}
};

export const AddAdvise = async (data) => {
    try {
        const res = await httpRequest.post('customer/create', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};

export const changeStatusAdvise = async (id, status) => {
    try {
        const res = await httpRequest.patch(`customer/change-status/${id}`, { status });
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};

export const deleteAdvise = async (id) => {
    try {
        const res = await httpRequest.patch(`customer/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {}
};
