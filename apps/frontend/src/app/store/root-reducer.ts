import { combineReducers } from 'redux';
import authReducer from './auth-store/reducers/login.reducer';
import studentRegistrationReducer from './registration-store/reducers/student-reducer';
import resetPasswordReducer from './auth-store/reducers/reset-password.reducer';
import loaderReducer from './loader-store/loader.reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  resetPassword: resetPasswordReducer,
  student: studentRegistrationReducer,
  loader: loaderReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer