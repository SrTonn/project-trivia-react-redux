export const PLAYER_INFOS = 'PLAYER_INFOS';

const updateData = (type, state) => ({
  type,
  payload: { ...state },
});

export default updateData;
