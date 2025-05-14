import cookie from 'react-cookies';
import { LOGIN_ADMIN, LOGOUT_ADMIN } from '~/actions/accountAction';

const initialState = {
    isLoggedIn: !!cookie.load('token'),
    accountAdminInfo: JSON.parse(localStorage.getItem('accountAdminInfo')) || null,
};

const AccountReducer = (state = initialState, action) => {
    // console.log('action.payload', action.payload);
    switch (action.type) {
        case LOGIN_ADMIN:
            localStorage.setItem('accountAdminInfo', JSON.stringify(action.payload));
            return {
                ...state,
                isLoggedIn: true,
                accountAdminInfo: action.payload,
            };
        case LOGOUT_ADMIN:
            localStorage.removeItem('accountAdminInfo');
            return {
                isLoggedIn: false,
                accountAdminInfo: null,
            };
        default:
            return state;
    }
};

export default AccountReducer;
