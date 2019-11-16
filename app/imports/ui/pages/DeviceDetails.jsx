import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import { Typography } from '@material-ui/core';
import actions from '../redux/actions';
import { getDevice } from '../redux/reducers/device';
import { isLoading, isReady } from '../redux/utils/state';

import DEVICES from '../devices';

import Layout from '../containers/PageLayout';

import Preloader from '../components/Preloader';

const mapStateToProps = createSelector([getDevice], (payload) => ({
  loading: isLoading(payload),
  details: isReady(payload) ? payload : null,
}));

const mapDispatchToProps = (dispatch) => ({
  handleFetch: (id) => dispatch(actions.device.fetch(id)),
  handleClear: () => dispatch(actions.device.clear()),
});

class DeviceDetailsPage extends PureComponent {
  componentDidMount() {
    const { handleFetch } = this.props;
    const { match } = this.props;
    handleFetch(match.params.id);
  }

  componentWillUnmount() {
    const { handleClear } = this.props;
    handleClear();
  }

  render() {
    const { loading, details } = this.props;

    return (
      <Layout withNavbar>
        {loading && <Preloader />}
        <Typography variant="h1">Device Details</Typography>
        {details && this.renderDetails()}
      </Layout>
    );
  }

  renderDetails = () => {
    const { details } = this.props;
    const { DetailsFlow } = DEVICES[details.type];
    return <DetailsFlow />;
  };
}

DeviceDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  details: PropTypes.shape({ type: PropTypes.oneOf(Object.keys(DEVICES)) }),
  loading: PropTypes.bool.isRequired,
  handleFetch: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

DeviceDetailsPage.defaultProps = {
  details: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetailsPage);
