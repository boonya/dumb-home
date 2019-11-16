import { Meteor } from 'meteor/meteor';

import Devices from '../collections/devices';

export default () => {
  Meteor.publish('devices', (...args) => Devices.find(...args));
};
