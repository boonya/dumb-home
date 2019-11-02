import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

import ROUTES, { goTo } from "../../../routes";

import { getDevice } from "../../../redux/reducers/device";
import { isLoading, isReady } from "../../../redux/utils/state";

import Details from "../../../components/Device/Camera/Details";
import Watch from "../../../components/Device/Camera/Watch";

const mapStateToProps = createSelector(
  [getDevice],
  payload => ({
    loading: isLoading(payload),
    details: isReady(payload) ? payload : null
  })
);

const mapDispatchToProps = dispatch => ({
  handleEdit: id => dispatch(goTo(ROUTES.EditDevice, { id }))
});

class DetailsContainer extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    details: PropTypes.shape({ _id: PropTypes.string.isRequired })
  };

  static defaultProps = {
    details: null
  };

  state = { watch: false };

  render() {
    const { loading, details } = this.props;

    if (!details) {
      return !loading && <Typography>Something went wrong</Typography>;
    }

    return this.state.watch ? this.renderWatch() : this.renderDetails();
  }

  renderDetails = () => {
    const { loading, details } = this.props;

    return <Details loading={loading} details={details} handleEdit={this.handleEdit} handleWatch={this.handleWatch} />;
  };

  renderWatch = () => {
    const { loading } = this.props;
    const id = this.props.details._id;

    return <Watch id={id} loading={loading} handleDetails={this.handleDetails} />;
  };

  handleEdit = () => {
    this.props.handleEdit(this.props.details._id);
  };

  handleWatch = () => {
    this.setState({ watch: true });
  };

  handleDetails = () => {
    this.setState({ watch: false });
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsContainer);
