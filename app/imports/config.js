/* eslint-disable import/no-named-as-default-member */
import ENV from './env';

export const APP = {
  TITLE: ENV.APP.TITLE || 'Dumb Home',
};

export const RECORDER = {
  CHUNK_DURATION: Number(ENV.RECORDER.CHUNK_DURATION) || 60 * 60,
  FOLDER: ENV.RECORDER.FOLDER,
  DIRECTORY_PATH_FORMAT: 'YYYY-MM-DD',
  FILENAME_FORMAT: 'HH-mm-ss',
};

export default { APP, RECORDER };
