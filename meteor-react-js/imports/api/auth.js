import {
  Meteor,
} from 'meteor/meteor';

const login = ({
  email,
  password,
}) => {
  return new Promise((resolve, reject) => {
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(Meteor.user());
    });
  });
};

const logout = () => {
  return new Promise((resolve, reject) => {
    Meteor.logout((err) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

const logoutOthers = () => {
  return new Promise((resolve, reject) => {
    Meteor.logoutOtherClients((err) => {
      if (err) {
        return reject(err);
      }
      resolve(true);
    });
  });
};

export {
  login,
  logout,
  logoutOthers,
};
