import { Meteor } from "meteor/meteor";

import Markup from "../imports/server/markup";
import Accounts from "../imports/server/accounts";
import handleCamStream from "../imports/server/camera";

import "../imports/collections/devices";

Meteor.startup(() => {
  Markup.render();
  Accounts.createSuperUser();
  Accounts.onCreateHook();

  WebApp.connectHandlers.use("/camera", handleCamStream);
});
