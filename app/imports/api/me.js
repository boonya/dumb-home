import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Observable } from "rxjs";

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

const observable = () => {
  return new Observable(observer => {
    Tracker.autorun(
      () => {
        observer.next(fetch());
        // observer.complete: () => console.log("completed") // completed
      },
      { onError: observer.error }
    );
  });
};

export default { login, logout, logoutEverywhere, fetch, observable };
