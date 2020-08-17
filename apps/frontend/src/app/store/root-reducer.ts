import { combineReducers } from 'redux';
import authReducer from './auth-store/reducers/login.reducer';
import studentRegistrationReducer from './registration-store/reducers/student-reducer';
import resetPasswordReducer from './auth-store/reducers/reset-password.reducer';

export default combineReducers({
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  student: studentRegistrationReducer
});
