import RtspRecorder, { RecorderEvents } from 'rtsp-video-recorder';
import { RECORDER } from '../config';
import DEVICES from '../devices';
import Devices from '../collections/devices';
import api from '../api/camera';

class Recorder {
  Registry = {};

  getRecorderInstance = (id, uri, name) => {
    const { FOLDER, SEGMENT_TIME, DIR_SIZE_THRESHOLD, AUTO_CLEAR } = RECORDER;

    const recorder = new RtspRecorder(uri, FOLDER, {
      title: name,
      filenamePattern: `%H.%M.%S-${name.replace(/%/g, '%%')}`,
      segmentTime: SEGMENT_TIME,
      dirSizeThreshold: DIR_SIZE_THRESHOLD,
      autoClear: AUTO_CLEAR,
    });

    recorder.on(RecorderEvents.STARTED, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.STARTED}; "${name}": `, ...args);
    });

    recorder.on(RecorderEvents.STOPPED, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.STOPPED}; "${name}": `, ...args);
    });

    recorder.on(RecorderEvents.STOP, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.STOP}; "${name}": `, ...args);
    });

    recorder.on(RecorderEvents.PROGRESS, (buffer) => {
      const payload = buffer.toString();
      // frame=  638 fps= 21 q=-1.0 size=N/A time=00:00:31.85 bitrate=N/A speed=1.04x
      // [rtsp @ 0x7f82a8800000] max delay reached.
      // [rtsp @ 0x7f82a8800000] RTP: missed 101 packets
      if (
        /^\s*\[rtsp @ 0x[0-9a-f]+\] max delay reached/.test(payload)
        || /^\s*\[rtsp @ 0x[0-9a-f]+\] RTP: missed/.test(payload)
        || /^\s*frame=/.test(payload)
      ) {
        return;
      }
      console.log(` ${new Date()}; ${RecorderEvents.PROGRESS}; "${name}": `, payload);
    });

    recorder.on(RecorderEvents.ERROR, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.ERROR}; "${name}": `, ...args);
    });

    recorder.on(RecorderEvents.SEGMENT_STARTED, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.SEGMENT_STARTED}; "${name}": `, ...args);
    });

    recorder.on(RecorderEvents.DIRECTORY_CREATED, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.DIRECTORY_CREATED}; "${name}": `, ...args);
    });

    recorder.on(RecorderEvents.FILE_CREATED, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.FILE_CREATED}; "${name}": `, ...args);
    });

    recorder.on(RecorderEvents.SPACE_FULL, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.SPACE_FULL}; "${name}": `, ...args);
    });

    recorder.on(RecorderEvents.SPACE_WIPED, (...args) => {
      console.log(` ${new Date()}; ${RecorderEvents.SPACE_WIPED}; "${name}": `, ...args);
    });

    return recorder;
  };

  start = ({ id, name, uri }) => {
    const recorder = this.getRecorderInstance(id, uri, name);
    recorder
      .on('stopped', Meteor.bindEnvironment(() => {
        Devices.update({ _id: id }, { $set: { recording: false } });
      }))
      .start();
    Devices.update({ _id: id }, { $set: { recording: true } });
    this.Registry[id] = recorder;
  };

  stop = ({ id }) => {
    const recorder = this.Registry[id];
    if (recorder) {
      recorder.stop();
    }
    Devices.update({ _id: id }, { $set: { recording: false } });
  };

  startup = () => {
    const promises = Devices.find({ type: DEVICES.CAMERA, recording: true })
      .fetch()
      .map(async ({ _id, label, details, username, password }) => {
        const { hostname, port } = details;
        const uri = await api.getStreamUri(hostname, port, username, password);
        this.start({ id: _id, name: label, uri });
      });
    Promise.all(promises);
  };
}

const recorder = new Recorder();

export default {
  start: recorder.start,
  stop: recorder.stop,
  startup: recorder.startup,
};
