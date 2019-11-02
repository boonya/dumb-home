import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

import ROUTES, { goTo } from "../../../routes";

import actions from "../../../redux/actions";
import { getDevice } from "../../../redux/reducers/device";
import { isLoading, isReady } from "../../../redux/utils/state";

import CameraEdit from "../../../components/Device/Camera/Edit";

const mapStateToProps = createSelector(
  [getDevice],
  payload => ({
    loading: isLoading(payload),
    details: isReady(payload) ? payload : null
  })
);

const mapDispatchToProps = dispatch => ({
  handleChange: params => dispatch(actions.camera.edit(params)),
  handleCancel: id => dispatch(goTo(ROUTES.DeviceDetails, { id }))
});

class EditContainer extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    details: PropTypes.shape({ _id: PropTypes.string.isRequired })
  };

  static defaultProps = {
    details: null
  };

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

  handleChange = data => {
    const { _id } = this.props.details;
    this.props.handleChange({ _id, ...data });
  };

  handleCancel = () => {
    this.props.handleCancel(this.props.details._id);
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditContainer);
