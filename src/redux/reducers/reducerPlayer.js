import { PLAYER_INFOS, UPDATE_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const reducerPlayer = (state = INITIAL_STATE, action) => {
  if (action.type === PLAYER_INFOS) {
    return {
      ...action.payload,
    };
  }
  if (action.type === UPDATE_SCORE) {
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.payload,
    };
  }
  return state;
};

export default reducerPlayer;
