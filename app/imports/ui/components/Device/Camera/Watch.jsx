import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Preloader from "../../../components/Preloader";
import VideoPlayer from "../../../components/Device/Camera/VideoPlayer";

export default class Details extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    handleDetails: PropTypes.func.isRequired
  };

  render() {
    const { loading } = this.props;

    return (
      <Grid>
        {loading && <Preloader />}
        <Button onClick={this.props.handleDetails}>See properties</Button>
        <VideoPlayer id={this.props.id} />
      </Grid>
    );
  }
}
