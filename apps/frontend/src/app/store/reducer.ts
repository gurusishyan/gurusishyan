import { combineReducers } from 'redux';
import signInReducer from './authentication/store_signin';
import registrationReducer from './authentication/store_registration'

export default combineReducers({
  signIn: signInReducer,
  registration: registrationReducer
});
