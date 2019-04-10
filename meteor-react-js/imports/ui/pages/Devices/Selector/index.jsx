import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";

import DeviceTypes from "./DeviceTypes";

class Selector extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    return (
      <>
        <DeviceTypes onSelect={this.handleSelect} />
        <Button onClick={this.handleCancel}>Close</Button>
      </>
    );
  }

  handleSelect = deviceType => this.props.onSelect(deviceType);

  handleCancel = () => this.props.onCancel();
}

export default Selector;
