import { Meteor } from 'meteor/meteor';

import Devices from '../collections/devices';

import METHODS from '../methods';
import DEVICES from '../devices';

const discover = () => new Promise((resolve, reject) => {
  try {
    Meteor.call(METHODS.DISCOVER_CAMERA, (err, response) => {
      if (err) return reject(err);
      resolve(response);
    });
  } catch (error) {
    reject(error);
  }
});

const add = async (params) => {
  const { hostname, port } = params.details;
  return Devices.insert({
    ...params,
    details: { hostname, port },
    type: DEVICES.CAMERA,
    owner: Meteor.userId(),
  });
};

const edit = async ({ _id, label, username, password }) => (
  Devices.update({ _id }, { $set: { label, username, password } })
);

const startRecord = (id, name, uri) => new Promise((resolve, reject) => {
  Meteor.call(METHODS.CAMERA_RECORD_START, { id, name, uri }, (err, response) => {
    if (err) return reject(err);
    Devices.update({ _id: id }, { $set: { recording: true } });
    resolve(response);
  });
});

const stopRecord = (id) => new Promise((resolve, reject) => {
  Meteor.call(METHODS.CAMERA_RECORD_STOP, { id }, (err, response) => {
    if (err) return reject(err);
    Devices.update({ _id: id }, { $set: { recording: false } });
    resolve(response);
  });
});

const getStreamUri = (hostname, port, username, password) => new Promise((resolve, reject) => {
  Meteor.call(METHODS.CAMERA_GET_STREAM_URI, { hostname, port, username, password }, (err, uri) => {
    if (err) return reject(err);
    resolve(uri);
  });
});

const record = async ({ _id, recording }) => {
  if (!recording) {
    await stopRecord(_id);
    return;
  }
  const { label, details: { hostname, port }, username, password } = Devices.findOne({ _id });
  const uri = await getStreamUri(hostname, port, username, password);
  await startRecord(_id, label, uri);
};

export default { discover, add, edit, record };
