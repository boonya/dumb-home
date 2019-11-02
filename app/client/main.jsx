import { Meteor } from "meteor/meteor";

import React from "react";
import ReactDOM from "react-dom";

import App from "../imports/ui/App";

function Main() {
  React.useEffect(() => {
    const jssStyles = document.getElementById("#jss-server-side");
    // const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return <App />;
}

Meteor.startup(() => {
  ReactDOM.render(<Main />, document.getElementById("viewport-root"));
});
