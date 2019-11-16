import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Typography } from '@material-ui/core';

import DEVICES from '../devices';

import Layout from '../containers/PageLayout';

class CreateDevicePage extends Component {
  render() {
    return (
      <Layout withNavbar>
        <Typography variant="h1">
          Create
          {this.getDeviceType()}
          Device
        </Typography>
        {this.renderCreateFlow()}
      </Layout>
    );
  }

  renderCreateFlow = () => {
    const { CreateFlow } = DEVICES[this.getDeviceType().toUpperCase()];
    return <CreateFlow />;
  };

  getDeviceType = () => {
    const { match } = this.props;
    return match.params.type;
  };
}

CreateDevicePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
};

export default CreateDevicePage;
