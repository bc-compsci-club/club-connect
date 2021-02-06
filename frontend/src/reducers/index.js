import { combineReducers } from 'redux';

import userLoggedInReducer from 'reducers/userLoggedIn';
import dropdownOpenReducer from 'reducers/dropdownOpen';

const reducers = combineReducers({
  userLoggedIn: userLoggedInReducer,
  dropdownOpen: dropdownOpenReducer,
});

export default reducers;
