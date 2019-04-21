import { Meteor } from "meteor/meteor";

import Markup from "./markup";
import Accounts from "./accounts";
import handleCamStream from "./camera";

import "../imports/collections/devices";

Meteor.startup(() => {
  Markup.render();
  Accounts.createSuperUser();
  Accounts.onCreateHook();

  WebApp.connectHandlers.use("/camera", handleCamStream);
});
