import * as adviseService from '~/services/adviseService';

export const setCountAdviseAction = (count) => {
    return {
        type: 'COUNT_ADVISE',
        payload: count,
    };
};

export const fetchCountAdviseAction = () => {
    return async (dispatch) => {
        try {
            const res = await adviseService.getAdvise();
            dispatch(setCountAdviseAction(res.countSpending));
        } catch (error) {}
    };
};
