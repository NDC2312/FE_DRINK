import cookie from 'react-cookies';
import { LOGIN, LOGOUT } from '~/actions/authAction';

const initialState = {
    isLoggedIn: !!cookie.load('tokenAuth'),
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
};

const authReducer = (state = initialState, action) => {
    // console.log('action.payload', action.payload);
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            return {
                ...state,
                isLoggedIn: true,
                userInfo: action.payload,
            };
        case LOGOUT:
            localStorage.removeItem('userInfo');
            return {
                isLoggedIn: false,
                userInfo: null,
            };
        default:
            return state;
    }
};

export default authReducer;
