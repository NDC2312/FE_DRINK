import { combineReducers } from 'redux';

import roleReducer from './roleReducer';
import permissionReducer from './permissionsReducer';

const allReducers = combineReducers({
    roleReducer,
    permissionReducer,
});

export default allReducers;
