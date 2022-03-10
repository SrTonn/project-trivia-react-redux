import { combineReducers } from 'redux';
import reducerPlayer from './reducerPlayer';
import token from './reducerToken';

const rootReducer = combineReducers({
  reducerPlayer,
  token,
});

export default rootReducer;
