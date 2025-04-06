import httpRequest from '~/components/utils/httpRequest';
import { success, error } from '~/components/SweetAlert2';

// get chat
export const getChat = async (data) => {
    try {
        const res = await httpRequest.get('chat', { params: data });
        return res.data;
    } catch (error) {
        error(error());
    }
};
