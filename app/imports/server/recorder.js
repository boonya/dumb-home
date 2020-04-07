import Recorder, { RecorderEvents } from 'rtsp-video-recorder';
import { RECORDER } from '../config';
import DEVICES from '../devices';
import Devices from '../collections/devices';
import api from '../api/camera';

const Registry = {};

const getRecorderInstance = (id, uri, name) => {
  const stackLimit = 100;
  const progressStack = [];

  const { FOLDER, SEGMENT_TIME, DIR_SIZE_THRESHOLD, AUTO_CLEAR } = RECORDER;

  const recorder = new Recorder(uri, FOLDER, {
    title: name,
    filenamePattern: `%H.%M.%S-${name.replace(/%/g, '%%')}`,
    segmentTime: SEGMENT_TIME,
    dirSizeThreshold: DIR_SIZE_THRESHOLD,
    autoClear: AUTO_CLEAR,
  });

  recorder.on(RecorderEvents.STARTED, (...args) => {
    console.log(`Recorder started "${name}": `, ...args);
  });

  recorder.on(RecorderEvents.STOPPED, (...args) => {
    console.log(`Recorder stopped "${name}": `, ...args);

    console.log('\n/** *********************** */\n');
    console.log(`These are last ${progressStack.length} progress events of camera "${name}": \n`);
    progressStack.forEach((item) => console.log(item));
    console.log('\n/** *********************** */\n');
  });

  recorder.on(RecorderEvents.PROGRESS, (buffer) => {
    progressStack.push(buffer.toString());
    if (progressStack.length > stackLimit) {
      progressStack.splice(progressStack.length - stackLimit);
    }
  });

  recorder.on(RecorderEvents.ERROR, (...args) => {
    console.log(`Recorder error "${name}": `, ...args);
  });

  recorder.on(RecorderEvents.SEGMENT_STARTED, (...args) => {
    console.log(`Recorder segment started "${name}": `, ...args);
  });

  recorder.on(RecorderEvents.DIRECTORY_CREATED, (...args) => {
    console.log(`Recorder directory created "${name}": `, ...args);
  });

  recorder.on(RecorderEvents.FILE_CREATED, (...args) => {
    console.log(`Recorder file created "${name}": `, ...args);
  });

  recorder.on(RecorderEvents.SPACE_FULL, (...args) => {
    console.log(`Recorder space full "${name}": `, ...args);
  });

  recorder.on(RecorderEvents.SPACE_WIPED, (...args) => {
    console.log(`Recorder space wiped "${name}": `, ...args);
  });

  return recorder;
};

const start = async ({ id, name, uri }) => {
  const recorder = getRecorderInstance(id, uri, name);
  recorder.start();
  Registry[id] = recorder;
  return recorder;
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

export default {
  start,
  stop,
  startup,
};
