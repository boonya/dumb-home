import { handleActions } from 'redux-actions';

import actions from '../actions';

export default handleActions(
  {
    [actions.locale.change]: (_, { payload }) => payload,
  },
  null,
);

export const getLocale = ({ locale }) => locale;
