import Markup from "../imports/server/markup";
import Accounts from "../imports/server/accounts";
import Methods from "../imports/server/methods";
import Publish from "../imports/server/publish";
import Routes from "../imports/server/routes";

Meteor.startup(() => {
  Markup.render("viewport-root");
  // Accounts.createSuperUser();
  Accounts.onCreateHook();
  Meteor.methods(Methods);
  Publish();
  Routes();
});
