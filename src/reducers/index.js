import { combineReducers } from 'redux';

import roleReducer from './roleReducer';
import permissionReducer from './permissionsReducer';
import cartReducer from './cartReducer';

const allReducers = combineReducers({
    roleReducer,
    permissionReducer,
    cart: cartReducer,
});

export default allReducers;
