import cookie from 'react-cookies';
import { LOGIN, LOGOUT } from '~/actions/authAction';

const initialState = {
    isLoggedIn: !!cookie.load('tokenAuth'),
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
            };
        case LOGOUT:
            return {
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default authReducer;
