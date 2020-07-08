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
  device: isReady(payload) ? payload : null,
}));

const mapDispatchToProps = (dispatch) => ({
  subscribe: (id) => dispatch(actions.device.subscribe(id)),
  unsubscribe: (id) => dispatch(actions.device.unsubscribe(id)),
});

class DeviceDetailsPage extends PureComponent {
  componentDidMount() {
    const { subscribe, match } = this.props;
    subscribe(match.params.id);
  }

  componentWillUnmount() {
    const { unsubscribe, match } = this.props;
    unsubscribe(match.params.id);
  }

  render() {
    const { loading, device } = this.props;
    const { DetailsFlow } = device ? DEVICES[device.type] : { DetailsFlow: () => null };

    return (
      <Layout withNavbar>
        {loading && <Preloader />}
        <Typography variant="h1">Device Details</Typography>
        <DetailsFlow />
      </Layout>
    );
  }
}

DeviceDetailsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  device: PropTypes.shape({ type: PropTypes.string }),
  loading: PropTypes.bool.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

DeviceDetailsPage.defaultProps = {
  device: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetailsPage);
