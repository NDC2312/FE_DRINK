// import socket from '~/services/socket.io';

export const LOGIN_ADMIN = 'LOGIN_ADMIN';
export const LOGOUT_ADMIN = 'LOGOUT_ADMIN';

export const login_admin = (data) => {
    return {
        type: LOGIN_ADMIN,
        payload: data,
    };
};

export const logout_admin = () => {
    return (dispatch) => {
        // if (socket && socket.connected) {
        //     socket.disconnect();
        //     console.log('Da disconnected');
        // }
        dispatch({
            type: LOGOUT_ADMIN,
        });
    };
};
