import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import ROUTES, { goTo } from '../../../routes';

import actions from '../../../redux/actions';
import { getDevice } from '../../../redux/reducers/device';
import { isLoading, isReady } from '../../../redux/utils/state';

import CameraEdit from '../../../components/Device/Camera/Edit';

const mapStateToProps = createSelector([getDevice], (payload) => ({
  loading: isLoading(payload),
  details: isReady(payload) ? payload : null,
}));

const mapDispatchToProps = (dispatch) => ({
  handleChange: (params) => dispatch(actions.camera.edit(params)),
  handleCancel: (id) => dispatch(goTo(ROUTES.DeviceDetails, { id })),
});

class EditContainer extends PureComponent {
  render() {
    const { loading, details } = this.props;

    if (!details) {
      return !loading && <Typography>Something went wrong</Typography>;
    }

    return (
      <CameraEdit
        loading={loading}
        details={details}
        handleChange={this.handleChange}
        handleCancel={this.handleCancel}
      />
    );
  }

  handleChange = (data) => {
    const { details, handleChange } = this.props;
    const { _id } = details;
    handleChange({ _id, ...data });
  };

  handleCancel = () => {
    const { details, handleCancel } = this.props;
    handleCancel(details._id);
  };
}

EditContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  details: PropTypes.shape({ _id: PropTypes.string.isRequired }),
  handleChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

EditContainer.defaultProps = {
  details: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);
