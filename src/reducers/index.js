import { combineReducers } from 'redux';

import roleReducer from './roleReducer';
import permissionReducer from './permissionsReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

const allReducers = combineReducers({
    roleReducer,
    permissionReducer,
    cart: cartReducer,
    auth: authReducer,
});

export default allReducers;
