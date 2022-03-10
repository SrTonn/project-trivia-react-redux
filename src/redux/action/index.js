export const PLAYER_INFOS = 'PLAYER_INFOS';
export const UPDATE_TOKEN = 'UPDATE_TOKEN';

const updateData = (type, state) => ({
  type,
  payload: state,
});

export default updateData;
