import { handleActions } from 'redux-actions';

import actions from '../actions';

export default handleActions(
  {
    [actions.notification.show]: (_, { payload }) => [payload],
    [actions.notification.close]: () => [],
  },
  [],
);

export const getNotification = ({ notification }) => notification;
