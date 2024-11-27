// ~/reducers/cartReducer.js

import { UPDATE_CART } from '~/actions/cartActions';

const initialState = {
    updated: false,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CART:
            return {
                ...state,
                updated: !state.updated, // Toggle to trigger re-fetch in Cart component
            };
        default:
            return state;
    }
};

export default cartReducer;
