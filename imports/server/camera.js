import ffmpeg from 'fluent-ffmpeg';
import { Discovery, Cam } from 'onvif';

import Devices from '../api/devices';

const discover = () => new Promise((resolve, reject) => {
  try {
    Discovery.probe((err, cams) => {
      if (err) throw new Error(err);
      resolve(cams);
    });
  } catch (error) {
    reject(error);
  }
});

const getStreamUri = ({ hostname, port, username, password = '' }) => new Promise((resolve, reject) => {
  try {
    // eslint-disable-next-line no-new
    new Cam(
      {
        hostname,
        port,
        username,
        password,
      },
      function (err) {
        if (err) throw new Error(err);
        // eslint-disable-next-line no-shadow
        this.getStreamUri({ protocol: 'RTSP' }, (err, stream) => {
          if (err) throw new Error(err);
          resolve(stream.uri);
        });
      },
    );
  } catch (error) {
    reject(error);
  }
});

const getStream = (source) => ffmpeg(source, { logger: console })
  .noAudio()
  .videoCodec('copy')
  .toFormat('mp4')
  .outputOptions([
    '-rtsp_transport',
    'tcp',

    '-movflags',
    'frag_keyframe+empty_moov',

    '-reset_timestamps',
    '1',

    '-vsync',
    '1',

    '-flags',
    'global_header',

    '-bsf:v',
    'dump_extra',
  ]);

const handleStream = async (_id) => {
  const { details, username, password } = await Devices.findOne({ _id });
  const { hostname, port } = details;
  const streamUri = await getStreamUri({
    hostname,
    port,
    username,
    password,
  });
  return getStream(streamUri);
};

export default { discover, getStreamUri, handleStream };
