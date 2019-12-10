import { combineReducers } from 'redux';

import emailReducer from './email';

export default combineReducers({
  email: emailReducer
});