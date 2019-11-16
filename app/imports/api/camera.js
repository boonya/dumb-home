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
    ...params, details: { hostname, port }, type: DEVICES.CAMERA, owner: Meteor.userId(),
  });
};

const edit = async ({ _id, label, username, password }) => (
  Devices.update({ _id }, { $set: { label, username, password } })
);

export default { discover, add, edit };
