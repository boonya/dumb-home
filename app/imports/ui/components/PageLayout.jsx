import PropTypes from "prop-types";
import React from "react";

import { withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import Navbar from "./Navbar";

const PageLayout = ({ classes, children, NavbarProps, ContainerProps }) => (
  <Grid container direction="column" wrap="nowrap" className={classes.root}>
    {NavbarProps && <Navbar {...NavbarProps} />}
    <Grid className={classes.container} {...ContainerProps}>
      {children}
    </Grid>
  </Grid>
);

PageLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  NavbarProps: PropTypes.object,
  ContainerProps: PropTypes.object
};

export default withStyles({
  root: {
    minHeight: "100%",
    overflow: "hidden"
  },
  container: {
    flexGrow: 1
  }
})(PageLayout);
