import { combineReducers } from 'redux';
import signInReducer from './authentication/signIn';

export default combineReducers({
  signIn: signInReducer,
});
