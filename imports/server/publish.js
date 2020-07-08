import { Meteor } from 'meteor/meteor';

import Devices from '../collections/devices';

/**
 * You've set up some data subscriptions with Meteor.publish(), but
 * you still have autopublish turned on. Because autopublish is still
 * on, your Meteor.publish() calls won't have much effect. All data
 * will still be sent to all clients.
 *
 * Turn off autopublish by removing the autopublish package:
 *
 *   $ meteor remove autopublish
 *
 * .. and make sure you have Meteor.publish() and Meteor.subscribe() calls
 * for each collection that you want clients to see.
 */
// TODO: Turn off autopublish by removing the autopublish package
export default () => {
  Meteor.publish('devices', (...args) => Devices.find(...args));
};
