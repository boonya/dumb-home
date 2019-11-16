import Devices from '../collections/devices';

const find = (...args) => Devices.find(...args);

const fetch = (...args) => find(...args).fetch();

const findOne = async (...args) => Devices.findOne(...args);

const insert = async (...args) => Devices.insert(...args);

const remove = async (...args) => Devices.remove(...args);

export default {
  find, fetch, findOne, insert, remove,
};
