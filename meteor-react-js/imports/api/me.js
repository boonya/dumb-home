import { Meteor } from "meteor/meteor";

import User from "../models/User";

const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        return reject(err);
      }
      resolve(new User(Meteor.user()));
    });
  });
};

const logout = () => {
  return new Promise((resolve, reject) => {
    Meteor.logout(err => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

const logoutEverywhere = () => {
  return new Promise((resolve, reject) => {
    Meteor.logoutOtherClients(err => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

const fetch = () => new User(Meteor.user());

export default { login, logout, logoutEverywhere, fetch };
