import { Meteor } from 'meteor/meteor';
import { Accounts as MeteorAccounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import { SUPERUSER } from '../env';

export default {
  onCreateHook() {
    MeteorAccounts.onCreateUser((options, user) => {
      const roles = ['user'];
      if (options.role === 'admin') roles.push('admin');
      Roles.addUsersToRoles(user._id, roles, Roles.GLOBAL_GROUP);
    });
  },

  createSuperUser() {
    if (!SUPERUSER.NAME || !SUPERUSER.EMAIL || !SUPERUSER.PASSWORD) {
      console.info('SUPERUSER env. vars is not defined. Skip.');
      return;
    }

    if (Meteor.users.find().count()) {
      console.info('Users collection already exists. Skip.');
      return;
    }

    const userId = MeteorAccounts.createUser({
      username: SUPERUSER.NAME,
      email: SUPERUSER.EMAIL,
      password: SUPERUSER.PASSWORD,
    });
    Roles.addUsersToRoles(userId, ['user', 'superuser'], Roles.GLOBAL_GROUP);

    console.info('Superuser account created: ', {
      id: userId,
      username: SUPERUSER.NAME,
      email: SUPERUSER.EMAIL,
    });
  },
};
