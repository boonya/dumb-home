const {
  SUPERUSER_NAME,
  SUPERUSER_EMAIL,
  SUPERUSER_PASSWORD,
  APP_TITLE,
  RECORDER_FOLDER,
  RECORDER_SEGMENT_TIME,
  RECORDER_DIR_SIZE_THRESHOLD,
  RECORDER_AUTO_CLEAR,
} = process.env;

export const APP = {
  TITLE: APP_TITLE,
};

export const SUPERUSER = {
  NAME: SUPERUSER_NAME,
  EMAIL: SUPERUSER_EMAIL,
  PASSWORD: SUPERUSER_PASSWORD,
};

export const RECORDER = {
  FOLDER: RECORDER_FOLDER,
  SEGMENT_TIME: RECORDER_SEGMENT_TIME,
  DIR_SIZE_THRESHOLD: RECORDER_DIR_SIZE_THRESHOLD,
  AUTO_CLEAR: RECORDER_AUTO_CLEAR,
};

export default { SUPERUSER, APP, RECORDER };
