import { PLAYER_INFOS, UPDATE_SCORE } from '../action';

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
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.gravatarEmail,
      },
    };
  }
  if (action.type === UPDATE_SCORE) {
    return {
      player: {
        ...state.player,
        score: state.player.score + action.payload,
      },
    };
  }
  return state;
};

export default reducerPlayer;
