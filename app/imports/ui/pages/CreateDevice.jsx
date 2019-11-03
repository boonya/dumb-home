import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { Typography } from "@material-ui/core";

import DEVICES from "../devices";

import Layout from "../containers/PageLayout";

class CreateDevicePage extends Component {
  static propTypes = {
    pending: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.object,
    match: PropTypes.shape({
      params: PropTypes.shape({
        type: PropTypes.string,
      }),
    }).isRequired,
  };

  static defaultProps = {
    pending: true,
    loading: false,
    error: null,
    details: null,
  };

  render() {
    return (
      <Layout withNavbar>
        <Typography variant="h1">Create {this.getDeviceType()} Device</Typography>
        {this.renderCreateFlow()}
      </Layout>
    );
  }

  renderCreateFlow = () => {
    const { CreateFlow } = DEVICES[this.getDeviceType().toUpperCase()];
    return <CreateFlow />;
  };

  getDeviceType = () => {
    return this.props.match.params.type;
  };
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateDevicePage);
