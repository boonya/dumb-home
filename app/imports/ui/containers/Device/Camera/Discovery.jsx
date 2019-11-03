import PropTypes from "prop-types";
import React, { Component } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import actions from "../../../redux/actions";
import { isLoading, isReady } from "../../../redux/utils/state";
import { getDiscoveredCameras } from "../../../redux/reducers/camera";

import Discovery from "../../../components/Device/Camera/Discovery";
import List from "../../../components/Device/Camera/List";
import Form from "../../../components/Device/Camera/Form";

const mapStateToProps = createSelector(
  [getDiscoveredCameras],
  list => ({
    loading: isLoading(list),
    ready: isReady(list),
    list: isReady(list) ? list : [],
  })
);

const mapDispatchToProps = dispatch => ({
  handleDiscovery: () => dispatch(actions.camera.discover()),
  flushDiscoveryResults: () => dispatch(actions.camera.flushDiscoveryResults()),
  handleCreate: params => dispatch(actions.camera.add(params)),
});

class DiscoveryContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    handleDiscovery: PropTypes.func.isRequired,
    flushDiscoveryResults: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
  };

  state = { selected: null };

  componentWillUnmount() {
    this.props.flushDiscoveryResults();
  }

  render() {
    const { selected } = this.state;
    return selected ? this.renderForm() : this.renderDiscovery();
  }

  renderDiscovery = () => {
    const { loading, ready } = this.props;

    return (
      <Discovery
        loading={loading}
        ready={ready}
        List={this.renderDiscoveredList()}
        handleDiscovery={this.props.handleDiscovery}
      />
    );
  };

  renderDiscoveredList = () => {
    const { list } = this.props;

    return <List items={list} handleChoose={this.handleChoose} />;
  };

  renderForm = () => {
    const { selected } = this.state;

    return <Form details={selected} handleSubmit={this.props.handleCreate} />;
  };

  handleChoose = selected => {
    this.setState({ selected });
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoveryContainer);
