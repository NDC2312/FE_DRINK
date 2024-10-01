import { combineReducers } from 'redux';

import roleReducer from './roleReducer';
import permissionReducer from './permissionsReducer';
import countAdviseReducer from './countAdviseReducer';

const allReducers = combineReducers({
    roleReducer,
    permissionReducer,
    countAdviseReducer,
});

export default allReducers;
