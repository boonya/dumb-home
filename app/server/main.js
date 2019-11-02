import SSR from "../imports/server/ssr";
import Accounts from "../imports/server/accounts";
import Methods from "../imports/server/methods";
import Publish from "../imports/server/publish";
import Routes from "../imports/server/routes";

Meteor.startup(() => {
  SSR("viewport-root");
  // Accounts.createSuperUser();
  Accounts.onCreateHook();
  Meteor.methods(Methods);
  Publish();
  Routes();
});
