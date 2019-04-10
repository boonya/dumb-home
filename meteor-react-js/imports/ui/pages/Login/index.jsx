import PropTypes from "prop-types";
import React from "react";

import Form from "./Form";

import withStyles from "./styles";

const Page = ({ classes }) => (
  <div className={classes.container}>
    <Form state="pending" />
  </div>
);

Page.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Page);
