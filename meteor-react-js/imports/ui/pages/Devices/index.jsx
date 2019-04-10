import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";

import ButtonCreate from "../../common/ButtonCreate";
import { actions, SCREEN_TYPE } from "../../redux/actions/device";

import Listing from "./Listing";
import Selector from "./Selector";
import CreateForm from "./CreateForm";

import withStyles from "./styles";

class Devices extends PureComponent {
  static propTypes = {
    screenType: PropTypes.string.isRequired,
    deviceType: PropTypes.string,
    showListing: PropTypes.func.isRequired,
    showSelector: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    deviceType: null,
  };

  render() {
    const { screenType, deviceType } = this.props;

    switch (screenType) {
      case SCREEN_TYPE.SELECTOR:
        return this.renderSelector();
      case SCREEN_TYPE.CREATE:
        return this.renderForm(deviceType);
      case SCREEN_TYPE.LIST:
      default:
        return this.renderListing();
    }
  }

  renderListing = () => {
    return (
      <>
        <Listing />
        <ButtonCreate onClick={this.showSelector} />
      </>
    );
  };

  renderSelector = () => {
    return <Selector onSelect={this.showForm} onCancel={this.showListing} />;
  };

  renderForm = deviceType => {
    return <CreateForm deviceType={deviceType} onDone={this.showListing} onCancel={this.showListing} />;
  };

  showListing = () => this.props.showListing();
  showSelector = () => this.props.showSelector();
  showForm = deviceType => this.props.showForm(deviceType);
}

const mapStateToProps = ({ device }) => ({
  screenType: device.screen.screenType,
  deviceType: device.screen.deviceType,
});

const mapDispatchToProps = dispatch => ({
  showListing: () => dispatch(actions.showScreenList()),
  showSelector: () => dispatch(actions.showScreenSelector()),
  showForm: deviceType => dispatch(actions.showScreenCreate(deviceType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(Devices));
