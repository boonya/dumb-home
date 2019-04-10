import PropTypes from "prop-types";
import React from "react";

import { Button, CircularProgress } from "@material-ui/core";

import withStyles from "./styles";

const ActiveButton = ({ classes, children, disabled, pending, color, type }) => (
  <div className={classes.wrapper}>
    <Button variant="contained" className={classes.button} type={type} color={color} disabled={disabled || pending}>
      {children}
    </Button>
    {pending && <CircularProgress size={24} className={classes.progress} />}
  </div>
);

ActiveButton.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  pending: PropTypes.bool,
  color: PropTypes.string,
  type: PropTypes.string,
};

ActiveButton.defaultProps = {
  disabled: false,
  pending: false,
  color: "primary",
  type: "button",
};

export default withStyles(ActiveButton);
