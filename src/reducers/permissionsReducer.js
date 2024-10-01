const initialState = {
    permissions: JSON.parse(localStorage.getItem('permissions')) || [],
};

const permissionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PERMISSIONS':
            localStorage.setItem('permissions', JSON.stringify(action.payload));
            return { ...state, permissions: action.payload };
        case 'REMOVE-PERMISSIONS':
            localStorage.removeItem('permissions');
            return { permissions: [] };
        default:
            return state;
    }
};

export default permissionReducer;
