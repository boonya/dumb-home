import { Picker } from 'meteor/meteorhacks:picker';
import Camera from './camera';

export default () => {
  Picker.route('/camera/:id', (params, request, response) => {
    (async () => {
      try {
        const { id } = params;
        const stream = await Camera.handleStream(id);

        stream.on('start', (...args) => {
          console.info('FFMPEG Stream has started: ', ...args);
          response.writeHead(200, { 'Content-Type': 'video/mp4' });
        });
        // stream.on("progress", (...args) => console.info("FFMPEG Stream in progress: ", ...args));
        // stream.on("stderr", (...args) => console.error('FFMPEG.stream.on("stderr": ', ...args));
        // stream.on("error", (...args) => console.error('FFMPEG.stream.on("error" : ', ...args));
        stream.on('error', () => {});
        stream.on('end', (...args) => console.info('FFMPEG Stream is ended up: ', ...args));

        stream.pipe(response);

        response.on('pipe', () => console.info('Start piping to response stream.'));
        response.on('unpipe', () => console.info('Stop piping to response stream.'));
        response.on('close', () => {
          console.info('Response stream closed.');
          stream.kill();
        });
        response.on('end', () => console.info('Response stream ended.'));
      } catch (err) {
        console.error(err);
        response.end('An error occured');
      }
    })();
  });
};
