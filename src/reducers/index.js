import { combineReducers } from 'redux';

import roleReducer from './roleReducer';
import permissionReducer from './permissionsReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import settingReducer from './settingReducer';

const allReducers = combineReducers({
    roleReducer,
    permissionReducer,
    cart: cartReducer,
    auth: authReducer,
    settingReducer,
});

export default allReducers;
