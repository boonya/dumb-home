import { Meteor } from "meteor/meteor";
import { Accounts as MeteorAccounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";
import { SUPERUSER_USERNAME, SUPERUSER_EMAIL, SUPERUSER_PASSWORD } from "../env";

export default {
  onCreateHook() {
    MeteorAccounts.onCreateUser((options, user) => {
      const roles = ["user"];
      if (options.role === "admin") roles.push("admin");
      Roles.addUsersToRoles(user._id, roles, Roles.GLOBAL_GROUP);
    });
  },

  createSuperUser() {
    if (Meteor.users.find().count()) {
      console.info(`Users collection already exists`);
      return;
    }
    if (!SUPERUSER_USERNAME || !SUPERUSER_EMAIL || !SUPERUSER_PASSWORD) {
      console.info(`Some of SUPERUSER env. vars is not defined: `, {
        SUPERUSER_USERNAME,
        SUPERUSER_EMAIL,
        SUPERUSER_PASSWORD,
      });
      return;
    }
    const userId = MeteorAccounts.createUser({
      username: SUPERUSER_USERNAME,
      email: SUPERUSER_EMAIL,
      password: SUPERUSER_PASSWORD,
    });
    Roles.addUsersToRoles(userId, ["user", "superuser"], Roles.GLOBAL_GROUP);
    console.info(`Superuser account created: `, {
      id: userId,
      username: SUPERUSER_USERNAME,
      email: SUPERUSER_EMAIL,
    });
  },
};
