import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import actions from '../../../redux/actions';
import { isLoading, isReady } from '../../../redux/utils/state';
import { getDiscoveredCameras } from '../../../redux/reducers/camera';

import Discovery from '../../../components/Device/Camera/Discovery';
import List from '../../../components/Device/Camera/List';
import Form from '../../../components/Device/Camera/Form';

const mapStateToProps = createSelector([getDiscoveredCameras], (list) => ({
  loading: isLoading(list),
  ready: isReady(list),
  list: isReady(list) ? list : [],
}));

const mapDispatchToProps = (dispatch) => ({
  handleDiscovery: () => dispatch(actions.camera.discover()),
  flushDiscoveryResults: () => dispatch(actions.camera.flushDiscoveryResults()),
  handleCreate: (params) => dispatch(actions.camera.add(params)),
});

class DiscoveryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  componentWillUnmount() {
    const { flushDiscoveryResults } = this.props;
    flushDiscoveryResults();
  }

  render() {
    const { selected } = this.state;
    return selected ? this.renderForm() : this.renderDiscovery();
  }

  onCreate = () => {
    this.setState({
      selected: {
        label: null,
        hostname: null,
        port: null,
        username: null,
        password: null,
      },
    });
  };

  onCancel = () => {
    this.setState({ selected: null });
  };

  onChoose = ({ hostname, port }) => {
    this.setState({
      selected: {
        label: null,
        hostname,
        port: Number(port),
        username: null,
        password: null,
      },
    });
  };

  onSubmit = ({ label, username, password, hostname, port }) => {
    const { handleCreate } = this.props;

    handleCreate({
      label,
      username,
      password,
      details: {
        hostname,
        port,
      },
    });
  };

  renderDiscovery = () => {
    const { loading, ready, handleDiscovery } = this.props;

    return (
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Discovery
            loading={loading}
            ready={ready}
            List={this.renderDiscoveredList()}
            handleDiscovery={handleDiscovery}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={this.onCreate}>
            Create your own
          </Button>
        </Grid>
      </Grid>
    );
  };

  renderDiscoveredList = () => {
    const { list } = this.props;

    return <List items={list} handleChoose={this.onChoose} />;
  };

  renderForm = () => {
    const { selected } = this.state;

    return <Form {...selected} onSubmit={this.onSubmit} onCancel={this.onCancel} />;
  };
}

DiscoveryContainer.propTypes = {
  loading: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  list: PropTypes.array.isRequired,
  handleDiscovery: PropTypes.func.isRequired,
  flushDiscoveryResults: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryContainer);
