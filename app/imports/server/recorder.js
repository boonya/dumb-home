import { Recorder as RtspRecorder } from 'node-rtsp-recorder';

import CONFIG from '../config';
import DEVICES from '../devices';
import Devices from '../collections/devices';
import api from '../api/camera';

class Recorder {
  constructor({ name, uri }) {
    try {
      const { FOLDER, TIME_LIMIT, DIRECTORY_PATH_FORMAT, FILENAME_FORMAT } = CONFIG.RECORDER;
      this.process = new RtspRecorder({
        name,
        url: uri,
        timeLimit: TIME_LIMIT,
        folder: FOLDER,
        directoryPathFormat: DIRECTORY_PATH_FORMAT,
        fileNameFormat: FILENAME_FORMAT,
      });
    } catch (err) {
      console.error(err);
    }
  }

  start = () => {
    if (this.process) {
      this.process.startRecording();
    } else {
      console.error('Can\'t start record because of recorder isn\'t configured yet.');
    }
  };

  stop = () => {
    if (this.process) {
      this.process.stopRecording();
      this.process = null;
    } else {
      console.error('Can\'t stop record because of recorder isn\'t configured yet.');
    }
  };
}

const Registry = {};

const start = async ({ id, name, uri }) => {
  const recorder = new Recorder({ name, uri });
  recorder.start();
  Registry[id] = recorder;
  console.log('server/recorder.js start -> ', { id, name, uri });
};

const stop = async ({ id }) => {
  const recorder = Registry[id];
  if (recorder) {
    recorder.stop();
  }
  console.log('server/recorder.js stop -> ', { id });
};

const startup = () => {
  const cameras = Devices.find({ type: DEVICES.CAMERA, recording: true }).fetch();
  Promise.all(cameras.map(({ _id, recording }) => api.record({ _id, recording })));
};

export default { start, stop, startup };
