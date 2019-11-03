import ffmpeg from "fluent-ffmpeg";
import { Discovery, Cam } from "onvif";
import { Recorder } from "node-rtsp-recorder";

import Devices from "../api/devices";

export const discover = () => {
  return new Promise((resolve, reject) => {
    try {
      Discovery.probe((err, cams) => {
        if (err) throw new Error(err);
        resolve(cams);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const getStreamUri = ({ hostname, port, username, password = "" }) => {
  return new Promise((resolve, reject) => {
    try {
      new Cam({ hostname, port, username, password }, function(err) {
        if (err) throw new Error(err);
        this.getStreamUri({ protocol: "RTSP" }, (err, stream) => {
          if (err) throw new Error(err);
          resolve(stream.uri);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

const record = url => {
  console.log("Recorder: ", { name: "cam1", url });
  var rec = new Recorder({
    name: "cam1",
    url,
    // timeLimit: 60, // time in seconds for each segmented video file
    folder: "/Users/boonya/Documents/SmartHome/dumb-home/",
    // folder: "./media"
  });
  // Starts Recording
  console.log("Starts Recording");
  rec.startRecording();

  setTimeout(() => {
    console.log("Stopping Recording");
    rec.stopRecording();
    rec = null;
  }, 30000);
};

const getStream = source => {
  return ffmpeg(source, { logger: console })
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
    ]);
};

export default async _id => {
  const { details, username, password } = await Devices.findOne({ _id });
  const { hostname, port } = details;
  const streamUri = await getStreamUri({ hostname, port, username, password });
  return getStream(streamUri);
};
