import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ROUTES, { goTo } from '../../../routes';

import actions from '../../../redux/actions';

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
  startRecord: (id) => dispatch(actions.camera.startRecord(id)),
  stopRecord: (id) => dispatch(actions.camera.stopRecord(id)),
});

class DetailsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { watch: true };
  }

  render() {
    const { loading, details } = this.props;

    if (!details && !loading) {
      return <Typography>Something went wrong</Typography>;
    }

    const { watch } = this.state;

    return (
      <Grid>
        {watch ? this.renderWatch() : this.renderDetails()}
        <Button onClick={this.handleRecord}>
          {details.recording ? 'Stop Record' : 'Start Record'}
        </Button>
      </Grid>
    );
  }

  renderDetails = () => {
    const { loading, details } = this.props;

    return <Details loading={loading} details={details} handleEdit={this.handleEdit} handleWatch={this.handleWatch} />;
  };

  renderWatch = () => {
    const { loading, details } = this.props;
    const { _id, label, description, icon, recording } = details;

    return (
      <Watch
        id={_id}
        title={label}
        description={description}
        poster={icon}
        recording={recording}
        loading={loading}
        handleDetails={this.handleDetails}
      />
    );
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

  handleRecord = () => {
    const { startRecord, stopRecord, details } = this.props;
    const { _id, recording } = details;
    const method = recording ? stopRecord : startRecord;
    method(_id);
  };
}

const DETAILS_TYPE = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
  recording: PropTypes.bool,
});

DetailsContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  startRecord: PropTypes.func.isRequired,
  stopRecord: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  details: DETAILS_TYPE.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);
