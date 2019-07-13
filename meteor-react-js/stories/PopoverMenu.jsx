import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import PopoverMenu from "../imports/ui/components/PopoverMenu";

import DEVICES from "../imports/ui/devices";

storiesOf("Components|Menus", module).add("PopoverMenu", () => {
  const items = Object.keys(DEVICES).map(key => ({ key: key.toLowerCase(), ...DEVICES[key] }));

  return <PopoverMenu items={items} onSelect={action("onSelect")} />;
});
