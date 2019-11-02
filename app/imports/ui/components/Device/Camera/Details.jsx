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

export default class Details extends PureComponent {
  static propTypes = {
    details: CAMERA_TYPE.isRequired,
    loading: PropTypes.bool.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleWatch: PropTypes.func.isRequired
  };

  render() {
    const { loading } = this.props;
    const { label, username, password, details } = this.props.details;

    return (
      <Grid>
        {loading && <Preloader />}
        <Button onClick={this.props.handleWatch}>Watch stream</Button>
        <Button onClick={this.props.handleEdit}>Edit</Button>
        <CameraFrom readOnly label={label} username={username} password={password} details={details} />
      </Grid>
    );
  }
}
