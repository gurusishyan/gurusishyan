import { combineReducers } from 'redux';
import authReducer from './auth-store/reducer';

export default combineReducers({
  auth: authReducer,
});
