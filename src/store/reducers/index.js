import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DatabaseReducer from './DatabaseReducer';

const RootReducer = combineReducers({
    AuthReducer,
    DatabaseReducer
});

export default RootReducer;