import { UPDATE_TOKEN } from '../action';

const INITIAL_STATE = {
  token: '',
};

const reducerToken = (state = INITIAL_STATE, action) => {
  if (action.type === UPDATE_TOKEN) {
    return action.payload;
  }
  return state;
};

export default reducerToken;
