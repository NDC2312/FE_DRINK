import { combineReducers } from 'redux';

import roleReducer from './roleReducer';
import permissionReducer from './permissionsReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import settingReducer from './settingReducer';
import AccountReducer from './accountReducer';

const allReducers = combineReducers({
    roleReducer,
    permissionReducer,
    cart: cartReducer,
    auth: authReducer,
    AccountReducer,
    // authAdmin: authAdminReducer,
    settingReducer,
});

export default allReducers;
