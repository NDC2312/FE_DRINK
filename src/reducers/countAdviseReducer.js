const countAdviseReducer = (state = 0, action) => {
    switch (action.type) {
        case 'COUNT_ADVISE':
            return (state = action.payload);

        default:
            return state;
    }
};

export default countAdviseReducer;
