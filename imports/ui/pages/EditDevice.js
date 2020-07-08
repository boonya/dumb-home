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
});

class EditDevicePage extends PureComponent {
  componentDidMount() {
    const { handleFetch, match } = this.props;
    handleFetch(match.params.id);
  }

  render() {
    const { loading, details } = this.props;

    return (
      <Layout withNavbar>
        {loading && <Preloader />}
        <Typography variant="h1">Edit Device Details</Typography>
        {details && this.renderDetails()}
      </Layout>
    );
  }

  renderDetails = () => {
    const { details } = this.props;
    const { EditFlow } = DEVICES[details.type];
    return <EditFlow />;
  };
}

EditDevicePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  details: PropTypes.shape({ type: PropTypes.oneOf(Object.keys(DEVICES)) }),
  loading: PropTypes.bool.isRequired,
  handleFetch: PropTypes.func.isRequired,
};

EditDevicePage.defaultProps = {
  details: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDevicePage);
