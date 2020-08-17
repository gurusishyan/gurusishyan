import { combineReducers } from 'redux';
import authReducer from './auth-store/reducer';
import studentRegistrationReducer from './registration-store/reducers/student-reducer';

export default combineReducers({
  auth: authReducer,
  student: studentRegistrationReducer
});
