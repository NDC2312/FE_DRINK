// import socket from '~/services/socket.io';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (userData) => {
    // console.log('user', userData);

    return {
        type: LOGIN,
        payload: userData,
    };
};

export const logout = () => {
    return (dispatch) => {
        // if (socket && socket.connected) {
        //     socket.disconnect();
        //     console.log('Da disconnected');
        // }
        dispatch({
            type: LOGOUT,
        });
    };
};
