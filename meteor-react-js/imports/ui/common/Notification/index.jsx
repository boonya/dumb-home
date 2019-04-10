import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";

import withStyles from "./styles";
import { types } from "../../redux/actions/notification";

class Errors extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  AUTO_HIDE_DURATION = 5000;

  render() {
    const { classes, show } = this.props;

    return (
      <Snackbar
        anchorOrigin={{ vertical: `bottom`, horizontal: `center` }}
        open={show}
        onClose={this.handleClose}
        onExited={this.handleExit}
        TransitionComponent={Fade}
        autoHideDuration={this.AUTO_HIDE_DURATION}
      >
        <SnackbarContent className={classes.error} message={this.renderMessage()} action={this.renderAction()} />
      </Snackbar>
    );
  }

  renderMessage() {
    const { classes, message } = this.props;

    return (
      <div className={classes.message}>
        <ErrorIcon className={[classes.icon, classes.iconError].join(" ")} />
        {message}
      </div>
    );
  }

  renderAction() {
    const { classes } = this.props;

    return (
      <IconButton color="inherit" onClick={this.handleClose}>
        <CloseIcon className={classes.icon} />
      </IconButton>
    );
  }

  handleClose = () => this.props.dispatch({ type: types.NOTIFICATION_CLOSE });

  handleExit = () => this.props.dispatch({ type: types.NOTIFICATION_EXIT });
}

const selector = ({ notification }) => ({ ...notification });

export default connect(selector)(withStyles(Errors));
