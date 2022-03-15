export const PLAYER_INFOS = 'PLAYER_INFOS';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_RANKING = 'UPDATE_RANKING';

const updateData = (type, state) => ({
  type,
  payload: state,
});

export default updateData;
