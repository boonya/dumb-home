import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import ROUTES, { goTo } from '../../../routes';

import { getDevice } from '../../../redux/reducers/device';
import { isLoading, isReady } from '../../../redux/utils/state';

import Details from '../../../components/Device/Camera/Details';
import Watch from '../../../components/Device/Camera/Watch';

const mapStateToProps = createSelector([getDevice], (payload) => ({
  loading: isLoading(payload),
  details: isReady(payload) ? payload : null,
}));

const mapDispatchToProps = (dispatch) => ({
  handleEdit: (id) => dispatch(goTo(ROUTES.EditDevice, { id })),
});

class DetailsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { watch: true };
  }

  render() {
    const { loading, details } = this.props;

    if (!details) {
      return !loading && <Typography>Something went wrong</Typography>;
    }

    const { watch } = this.state;

    return watch ? this.renderWatch() : this.renderDetails();
  }

  renderDetails = () => {
    const { loading, details } = this.props;

    return <Details loading={loading} details={details} handleEdit={this.handleEdit} handleWatch={this.handleWatch} />;
  };

  renderWatch = () => {
    const { loading, details } = this.props;

    return <Watch id={details._id} loading={loading} handleDetails={this.handleDetails} />;
  };

  handleEdit = () => {
    const { handleEdit, details } = this.props;
    handleEdit(details._id);
  };

  handleWatch = () => {
    this.setState({ watch: true });
  };

  handleDetails = () => {
    this.setState({ watch: false });
  };
}

DetailsContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  details: PropTypes.shape({ _id: PropTypes.string.isRequired }),
};

DetailsContainer.defaultProps = {
  details: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
