export const types = {
  NOTIFICATION_SHOW: 'NOTIFICATION_SHOW',
  NOTIFICATION_CLOSE: 'NOTIFICATION_CLOSE',
  NOTIFICATION_EXIT: 'NOTIFICATION_EXIT',
};

export const actions = {
  show: () => ({ type: types.NOTIFICATION_SHOW }),
  close: () => ({ type: types.NOTIFICATION_CLOSE }),
  exit: () => ({ type: types.NOTIFICATION_EXIT }),
};
