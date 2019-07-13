import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { radios } from "@storybook/addon-knobs";

import LoginForm, { FORM_STATES } from "../imports/ui/components/LoginForm";

storiesOf("Components|Forms", module).add("LoginForm", () => {
  const state = radios("state", [null, ...Object.values(FORM_STATES)], null);

  return <LoginForm state={state} handleSubmit={action("handleSubmit")} />;
});
