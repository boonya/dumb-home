import Devices from '../imports/collections/devices';
import ffmpeg from "fluent-ffmpeg";

const pipeStream = (readableStream, writableStream) => {
  return ffmpeg(readableStream)
    .noAudio()
    .videoCodec("copy")
    .toFormat("mp4")
    .outputOptions([
      "-rtsp_transport",
      "tcp",

      "-movflags",
      "frag_keyframe+empty_moov",

      "-reset_timestamps",
      "1",

      "-vsync",
      "1",

      "-flags",
      "global_header",

      "-bsf:v",
      "dump_extra",

      // "-y",
      // "-",
    ])
    .on("start", commandLine => {
      console.log("Spawned FFMPEG with command: " + commandLine);
    })
    .on("progress", progress => {
      console.log("FFMPEG processing : ", progress);
    })
    .on("stderr", stderrLine => {
      console.log("FFMPEG stderr output: " + stderrLine);
    })
    .on("error", (err, stdout, stderr) => {
      console.log("FFMPEG Cannot process video: ", err);
    })
    // .on("end", function(stdout, stderr) {
    //   console.log("Transcoding succeeded !");
    // })

    // .output(chunk => res.write(chunk))
    .stream(writableStream);
  // .run()

  // .pipe()
  // .on("data", (chunk) => {
  //   const wrote = res.write(chunk);
  //   console.log("ffmpeg just wrote " + chunk.length + " bytes", wrote);
  // });
};

const getSource = (_id) => {
  const {
    dsn
  } = Devices.findOne({
    _id
  });
  return dsn;
};

const handleRequest = (request, response, next) => {
  // TODO: Need auth here!!!
  try {
    const source = getSource(request.url.replace('/', ''));
    if (!source) {
      throw new Error(`Can't determine source.`);
    }

    response.writeHead(200, {
      "Content-Type": "video/mp4",
    });

    const command = pipeStream(source, response);

    // response.on('close', () => {
    //   command.end();
    // });

  } catch (err) {
    response.end(err.message);
  }
};

export default handleRequest;
