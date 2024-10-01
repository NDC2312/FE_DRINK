import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const addPermissionGroup = async (data) => {
    try {
        const res = await httpRequest.post('role/create', data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const detailPermissionGroup = async (id) => {
    try {
        const res = await httpRequest.get(`role/detail/${id}`);
        return res.data;
    } catch (error) {}
};

export const editPermissionGroup = async (id, data) => {
    try {
        const res = await httpRequest.patch(`role/edit/${id}`, data);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};

export const deletePermissionGroup = async (id) => {
    try {
        const res = await httpRequest.patch(`role/delete/${id}`);
        if (res.data.code === 200) {
            success(res.data.message);
        } else {
            error(res.data.message);
        }
    } catch (error) {
        error(error());
    }
};
