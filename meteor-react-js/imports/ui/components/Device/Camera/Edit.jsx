import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Preloader from "../../../components/Preloader";
import CameraFrom from "../../../components/Device/Camera/Form";

const CAMERA_TYPE = PropTypes.shape({
  label: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  details: PropTypes.shape({ hostname: PropTypes.string.isRequired }).isRequired
});

export default class Edit extends PureComponent {
  static propTypes = {
    details: CAMERA_TYPE.isRequired,
    loading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
  };

  state = { watchingStream: false, editing: false };

  render() {
    const { loading } = this.props;
    const { label, username, password, details } = this.props.details;

    return (
      <Grid>
        {loading && <Preloader />}
        <CameraFrom
          label={label}
          username={username}
          password={password}
          details={details}
          handleSubmit={this.props.handleChange}
          handleCancel={this.props.handleCancel}
        />
      </Grid>
    );
  }
}
