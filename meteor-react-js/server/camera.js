import ffmpeg from "fluent-ffmpeg";

import { Meteor } from "meteor/meteor";
import { Accounts as MeteorAccounts } from "meteor/accounts-base";
import Devices from "../imports/collections/devices";

const Logger = prefix => ({
  error: (...data) => console.error(`${prefix} -> `, ...data),
  warn: (...data) => console.warn(`${prefix} -> `, ...data),
  info: (...data) => console.info(`${prefix} -> `, ...data),
  debug: (...data) => console.debug(`${prefix} ->`, ...data),
});

const getSource = id => {
  try {
    const { dsn } = Devices.findOne({ _id: id });
    return dsn;
  } catch (err) {
    throw new Error(`Can't determine source by ID "${id}".`);
  }
};

const getStream = source => {
  const logger = Logger(`FFMPEG ${source}`);

  return ffmpeg(source, { logger })
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
    ])
    .on("start", cmd => logger.info(`Spawned with command: "${cmd}".`))
    .on("progress", progress => logger.debug("Processing : ", progress))
    .on("stderr", output => logger.error(output))
    .on("error", err => logger.error(err))
    .on("end", (stdout, stderr) => logger.info("Transcoding succeeded!", { stdout, stderr }));
};

const handleRequest = (request, response) => {
  // TODO: Need auth here!!!
  try {
    const logger = Logger(`REQEST ${request.url}`);
    const source = getSource(request.url.replace("/", ""));

    logger.info(`Process "${source}" source.`);

    const stream = getStream(source);

    stream.on("start", () => response.writeHead(200, { "Content-Type": "video/mp4" }));
    stream.on("end", () => response.end());
    stream.pipe(response);

    response.on("pipe", () => logger.info("Start piping to response stream."));
    response.on("unpipe", () => logger.info("Stop piping to response stream."));
    response.on("close", () => logger.info("Response stream closed."));
    response.on("end", () => logger.info("Response stream ended."));
  } catch (err) {
    response.end(err.message);
  }
};

export default handleRequest;
