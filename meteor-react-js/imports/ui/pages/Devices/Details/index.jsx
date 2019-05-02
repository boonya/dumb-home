import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { Typography } from "@material-ui/core";

import { actions } from "../../../redux/actions/device";
import Preloader from "../../../common/Preloader";
import DEVICES from "../../../devices";

import withStyles from "./styles";

class DeviceList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    pending: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.object,
    details: PropTypes.object,
    fetchDetails: PropTypes.func.isRequired,
  };

  static defaultProps = {
    pending: true,
    loading: false,
    error: null,
    details: null,
  };

  componentDidMount() {
    this.props.fetchDetails(this.props.match.params.id);
  }

  render() {
    const { loading, details } = this.props;
    return (
      <>
        {loading && <Preloader />}
        <Typography variant="h1">Device Details</Typography>
        {/* <pre><Typography variant="body1">{JSON.stringify(details, null, 2)}</Typography></pre> */}
        {details && this.renderVideo()}
      </>
    );
  }

  renderVideo = () => {
    const { classes } = this.props;
    const { _id } = this.props.details;
    return (
      <video
        className={classes.video}
        width="100%"
        preload="none"
        autoPlay={true}
        controls={false}
        src={`/camera/${_id}`}
        type="video/mp4"
      >
        Video stream is not available
      </video>
    );
  };
}

const mapStateToProps = ({ device }) => ({ ...device.details });

const mapDispatchToProps = dispatch => ({
  fetchDetails: id => dispatch(actions.deviceDetails(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(DeviceList));
