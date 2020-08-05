import { combineReducers } from 'redux';
import authReducer from './auth-store/reducer';
import toastReducer from './toast-store/reducer';


export default combineReducers({
  auth: authReducer,
  toast: toastReducer
});
