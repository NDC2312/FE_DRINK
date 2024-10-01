import { DATA_REQUEST, DATA_SUCCESS, DATA_FAIL } from '~/actions/roleAction';

const initialState = {
    loading: false,
    data: [],
    error: '',
};

const roleReducer = (state = initialState, action) => {
    switch (action.type) {
        case DATA_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: '',
            };
        case DATA_FAIL:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default roleReducer;
