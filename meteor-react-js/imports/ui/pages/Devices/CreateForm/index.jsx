import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";

import { isPending, isLoading, isReady, isError } from '../../../redux/utils/valueState';
import { actions } from "../../../redux/actions/device";
import ActiveButton from "../../../common/ActiveButton";
import Preloader from "../../../common/Preloader";

import withStyles from "./styles";

class CreateDeviceForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    state: PropTypes.shape({
      pending: PropTypes.bool,
      loading: PropTypes.bool,
      error: PropTypes.object,
      success: PropTypes.bool,
    }),
    deviceType: PropTypes.string.isRequired,
    owner: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  static defaultProps = {
    state: {
      pending: true,
      success: false,
      loading: false,
      error: null,
    },
  };

  state = {
    title: "",
    accessToken: "",
    dsn: "",
  };

  render() {
    const { title, accessToken, dsn } = this.state;
    const { classes, state, deviceType } = this.props;

    return (
      <form className={classes.form} noValidate={false} autoComplete="off" onSubmit={this.handleSubmit}>
        {state.loading && <Preloader />}
        {/* {state.error && <Notification type="error" error={state.error} />} */}
        <FormControl margin={"dense"}>
          <TextField
            label="Device Title"
            type="text"
            className={classes.textField}
            defaultValue={title}
            onChange={this.handleChange("title")}
            required
          />
        </FormControl>

        <FormControl margin={"dense"}>
          <TextField label="Device Type" type="text" className={classes.textField} value={deviceType} disabled />
        </FormControl>

        <FormControl margin={"dense"}>
          <TextField
            label="Access Token"
            type="type"
            className={classes.textField}
            defaultValue={accessToken}
            onChange={this.handleChange("accessToken")}
            required
          />
        </FormControl>

        <FormControl margin={"dense"}>
          <TextField
            label="DSN"
            type="type"
            className={classes.textField}
            defaultValue={dsn}
            onChange={this.handleChange("dsn")}
            required
          />
        </FormControl>

        <FormControl margin={"dense"}>
          <ActiveButton type="submit" progress={state.loading}>
            Save
          </ActiveButton>
          <Button onClick={this.handleClose}>Close</Button>
        </FormControl>
      </form>
    );
  }

  handleChange = key => ({ target }) => this.setState({ [key]: target.value });

  handleClose = () => this.props.onCancel();

  handleSubmit = event => {
    event.preventDefault();
    const { deviceType: type, owner } = this.props;
    const { title, accessToken, dsn } = this.state;
    this.props.dispatch(actions.deviceCreate({ type, title, accessToken, dsn, owner }));
  };
}

const selector = ({ me, device }) => ({
  state: {
    pending: isPending(device.create),
    loading: isLoading(device.create),
    success: isReady(device.create),
    error: isError(device.create) ? device.create : null,
  },
  owner: me,
});

export default connect(selector)(withStyles(CreateDeviceForm));
