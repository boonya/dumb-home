import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import actions from "../redux/actions";
import { getDevice } from "../redux/reducers/device";
import { isLoading, isReady } from "../redux/utils/state";

import DEVICES from "../devices";

import { Typography } from "@material-ui/core";

import Layout from "../containers/PageLayout";

import Preloader from "../components/Preloader";

const mapStateToProps = createSelector(
  [getDevice],
  payload => ({
    loading: isLoading(payload),
    details: isReady(payload) ? payload : null
  })
);

const mapDispatchToProps = dispatch => ({
  handleFetch: id => dispatch(actions.device.fetch(id)),
  handleClear: () => dispatch(actions.device.clear())
});

class EditDevicePage extends PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired,
    details: PropTypes.shape({ type: PropTypes.oneOf(Object.keys(DEVICES)) }),
    loading: PropTypes.bool.isRequired,
    handleFetch: PropTypes.func.isRequired,
    handleClear: PropTypes.func.isRequired
  };

  static defaultProps = {
    details: null
  };

  componentDidMount() {
    this.props.handleFetch(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.handleClear();
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
    const { EditFlow } = DEVICES[this.props.details.type];
    return <EditFlow />;
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDevicePage);
