import { Recorder as RtspRecorder } from 'node-rtsp-recorder';

import { RECORDER } from '../config';
import DEVICES from '../devices';
import Devices from '../collections/devices';
import api from '../api/camera';

class Recorder {
  constructor({ name, uri }) {
    try {
      const { FOLDER, CHUNK_DURATION, DIRECTORY_PATH_FORMAT, FILENAME_FORMAT } = RECORDER;

      if (!FOLDER) {
        console.error("Recorder destination folder hasn't been set.");
        return;
      }

      this.process = new RtspRecorder({
        name,
        url: uri,
        timeLimit: CHUNK_DURATION,
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
};

const stop = async ({ id }) => {
  const recorder = Registry[id];
  if (recorder) {
    recorder.stop();
  }
};

const startup = () => {
  const cameras = Devices.find({ type: DEVICES.CAMERA, recording: true }).fetch();
  Promise.all(cameras.map(({ _id, recording }) => api.record({ _id, recording })));
};

export default { start, stop, startup };
