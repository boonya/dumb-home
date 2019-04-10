import { PropTypes } from "prop-types";
import React from "react";
import { Typography } from "@material-ui/core";

import withStyles from "./styles";

const Page = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant="h1">Page not found.</Typography>
  </div>
);

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Page);
