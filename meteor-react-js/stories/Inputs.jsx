import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean, select } from "@storybook/addon-knobs";
import Chance from "chance";

import Select from "../imports/ui/components/Select";
import { action } from "@storybook/addon-actions";

const chance = new Chance();
const ITEMS = chance.n(chance.profession, 6).map(label => ({
  value: label.toLowerCase().replace(/\W/gu, ""),
  label
}));

storiesOf("Components|Inputs", module).add("Select", () => {
  const label = text("label", "Select input label");
  const required = boolean("required", undefined);
  const placeholder = text("placeholder", undefined);
  const helperText = text("helperText", undefined);
  const fullWidth = boolean("fullWidth", undefined);

  return (
    <Select
      id={"select-id"}
      name={"select-name"}
      label={label}
      placeholder={placeholder}
      required={required}
      items={ITEMS}
      helperText={helperText}
      onChange={action("onChange")}
      fullWidth={fullWidth}
    />
  );
});
