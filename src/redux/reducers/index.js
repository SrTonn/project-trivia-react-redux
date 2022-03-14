import { combineReducers } from 'redux';
import player from './reducerPlayer';
import token from './reducerToken';

const rootReducer = combineReducers({
  player,
  token,
});

export default rootReducer;
