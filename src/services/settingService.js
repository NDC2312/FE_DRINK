import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

export const getSettings = async () => {
    try {
        const res = await httpRequest.get('settings');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateSettings = async (data) => {
    try {
        const res = await httpRequest.patch(data);
        console.log(res);
    } catch (error) {}
};
