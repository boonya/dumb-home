import PropTypes from "prop-types";
import React from "react";

import { Button, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const ActiveButton = ({ classes, children, disabled, pending, color, type, handleClick }) => (
  <div className={classes.wrapper}>
    <Button
      variant="contained"
      className={classes.button}
      type={type}
      color={color}
      disabled={disabled || pending}
      onClick={handleClick}
    >
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
  handleClick: PropTypes.func
};

ActiveButton.defaultProps = {
  disabled: false,
  pending: false,
  color: "primary",
  type: "button"
};

export default withStyles(theme => ({
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative"
  },
  button: {
    width: "100%"
  },
  progress: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}))(ActiveButton);
