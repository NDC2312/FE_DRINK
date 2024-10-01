export const setPermission = (permissions) => {
    return {
        type: 'PERMISSIONS',
        payload: permissions,
    };
};

export const removePermission = () => {
    return {
        type: 'REMOVE-PERMISSIONS',
    };
};
