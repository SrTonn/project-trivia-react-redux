import { PLAYER_INFOS } from '../action';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
  },
};

const reducerPlayer = (state = INITIAL_STATE, action) => {
  if (action.type === PLAYER_INFOS) {
    return {
      player: action.payload,
    };
  }
  return state;
};

export default reducerPlayer;
