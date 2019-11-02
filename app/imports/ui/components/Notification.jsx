import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import classNames from "classnames";

import { withStyles, Snackbar } from "@material-ui/core";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

class Notification extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    autoHideDuration: PropTypes.number.isRequired,
    message: PropTypes.node.isRequired,
    type: PropTypes.oneOf(Object.values(NOTIFICATION_TYPES)).isRequired,
  };

  ICONS = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  constructor(props) {
    super(props);
    this.state = { open: props.open };
  }

  render() {
    const { classes, type } = this.props;
    const { open } = this.state;

    return (
      <Snackbar
        ContentProps={{
          className: classes[type],
          message: this.renderMessage(),
          action: this.renderAction(),
        }}
        onClose={this.handleClose}
        onExited={this.handleExited}
        open={open}
      />
    );
  }

  renderMessage = () => {
    const { classes, message, type } = this.props;
    const Icon = this.ICONS[type];

    return (
      <span className={classes.message}>
        <Icon className={classNames(classes.icon, classes.iconVariant)} />
        {message}
      </span>
    );
  };

  renderAction = () => {
    const { classes } = this.props;

    return (
      <IconButton key="close" color="inherit" onClick={this.handleClickIcon}>
        <CloseIcon className={classes.icon} />
      </IconButton>
    );
  };

  handleClickIcon = event => {
    this.handleClose(event);
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  handleExited = () => this.props.onClose();
}

export default withStyles(({ palette, spacing }) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: palette.error.dark,
  },
  info: {
    backgroundColor: palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing.unit,
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}))(Notification);
