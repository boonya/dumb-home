import React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import Chance from "chance";

import Typography from "@material-ui/core/Typography";

import Discovery from "./Discovery";
import List from "./List";
import Form from "./Form";

const chance = new Chance();
const CAMERA_LIST = chance.n(
  () => ({
    hostname: chance.ip(),
    otherDetails: "...otherDetails",
  }),
  8
);
const HOSTNAME = chance.ip();

storiesOf("Components|Device/Camera", module)
  .add("Discovery", () => {
    const loading = boolean("loading", false);
    const ready = boolean("ready", false);
    const List = <Typography variant="h3">Container to show cams listing</Typography>;

    return <Discovery loading={loading} ready={ready} List={List} handleDiscovery={action("handleDiscovery")} />;
  })
  .add("List", () => {
    return <List items={CAMERA_LIST} handleChoose={action("handleChoose")} />;
  })
  .add("Form", () => {
    const label = text("label", "");
    const username = text("username", "");
    const password = text("password", "");
    const readOnly = boolean("readOnly", false);

    const ComponentWrapper = () => (
      <Form
        key={JSON.stringify({ label, username, password, readOnly })}
        label={label}
        username={username}
        password={password}
        details={{ hostname: HOSTNAME }}
        readOnly={readOnly}
        onAdd={action("onAdd")}
      />
    );

    return <ComponentWrapper />;
  });
