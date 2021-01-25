import { combineReducers } from 'redux';

import userLoggedInReducer from 'reducers/userLoggedIn';

const reducers = combineReducers({ user: userLoggedInReducer });

export default reducers;
