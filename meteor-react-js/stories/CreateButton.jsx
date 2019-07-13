import React from "react";
import { storiesOf } from "@storybook/react";

import CreateButton from "../imports/ui/components/CreateButton";

storiesOf("Components|Buttons", module).add("CreateButton", () => (
  <CreateButton id="any-element-id">any children</CreateButton>
));
