import METHODS from '../methods';
import Camera from './camera';
import Recorder from './recorder';

export default {
  [METHODS.DISCOVER_CAMERA]: Camera.discover,
  [METHODS.CAMERA_GET_STREAM_URI]: Camera.getStreamUri,
  [METHODS.CAMERA_RECORD_START]: Recorder.start,
  [METHODS.CAMERA_RECORD_STOP]: Recorder.stop,
};
