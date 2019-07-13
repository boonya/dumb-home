import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import ActiveButton from "../imports/ui/components/ActiveButton";

storiesOf("Components|Buttons", module).add("ActiveButton", () => {
  const disabled = boolean("disabled", false);
  const pending = boolean("pending", false);
  const type = select("type", ["button", "submit"], "button");

  return (
    <ActiveButton disabled={disabled} pending={pending} type={type} handleClick={action("handleClick")}>
      any children
    </ActiveButton>
  );
});
