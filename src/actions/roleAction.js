import httpRequest from '~/components/utils/httpRequest';

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_FAIL = 'DATA_FAIL';

export const dataRequest = () => {
    return {
        type: DATA_REQUEST,
    };
};

export const dataSuccess = (data) => {
    return {
        type: DATA_SUCCESS,
        payload: data,
    };
};
export const dataFail = (error) => {
    return {
        type: DATA_FAIL,
        payload: error,
    };
};

export const fetchData = () => {
    return async (dispatch) => {
        dispatch(dataRequest());
        try {
            const res = await httpRequest.get('role');
            dispatch(dataSuccess(res.data));
        } catch (error) {
            dispatch(dataFail(error.message));
        }
    };
};

export const fetchDataUpdate = (permissions = []) => {
    return async (dispatch) => {
        dispatch(dataRequest());
        try {
            const res = await httpRequest.patch('role/permissions', permissions);
            dispatch.dataSuccess(res.data);
        } catch (error) {}
    };
};
