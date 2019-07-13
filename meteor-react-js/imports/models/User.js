import {isEmpty} from 'lodash';

export default class User {
  constructor(data) {
    this._data = data;
  }

  get id() {
    return this._data._id;
  }

  get username() {
    return this._data.username;
  }

  get email() {
    return this._data.emails[0].address;
  }

  get points() {
    return this._data.profile.points;
  }

  get role() {
    return this._data.profile.role;
  }

  isLoggedIn = () => !isEmpty(this._data) && !isEmpty(this._data._id);
}
