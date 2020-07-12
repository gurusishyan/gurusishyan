import { combineReducers } from 'redux';
import signInReducer from './authentication/signIn';
import registrationReducer from './authentication/store_registration'

export default combineReducers({
  signIn: signInReducer,
  registration: registrationReducer
});
