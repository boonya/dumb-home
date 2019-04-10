import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import Button from "@material-ui/core/Button";

import DEVICES from "../../../../devices";

class DeviceTypes extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ul>
        {Object.values(DEVICES).map(({ name }, index) => (
          <li key={index}>
            <Button onClick={this.handleClick(name)}>{name}</Button>
          </li>
        ))}
      </ul>
    );
  }

  handleClick = deviceType => () => this.props.onSelect(deviceType);
}

export default DeviceTypes;
