/* eslint-disable import/no-named-as-default-member */
import ENV from './env';

export const APP = {
  TITLE: ENV.APP.TITLE || 'Dumb Home',
};

export const RECORDER = {
  FOLDER: ENV.RECORDER.FOLDER,
  SEGMENT_TIME: ENV.RECORDER.SEGMENT_TIME,
  DIR_SIZE_THRESHOLD: ENV.RECORDER.DIR_SIZE_THRESHOLD,
  AUTO_CLEAR: ENV.AUTO_CLEAR === undefined ? true : ENV.RECORDER.AUTO_CLEAR,
};

export default { APP, RECORDER };
