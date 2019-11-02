import PropTypes from "prop-types";
import React, { PureComponent, Fragment } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

const CAMERA_TYPE = PropTypes.shape({
  hostname: PropTypes.string.isRequired
});

export default class CameraList extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(CAMERA_TYPE).isRequired,
    handleChoose: PropTypes.func.isRequired
  };

  static defaultProps = {};

  render() {
    return (
      <List>
        {this.props.items.map(({ hostname, ...rest }) => (
          <Fragment key={hostname}>{this.renderItem({ hostname, ...rest })}</Fragment>
        ))}
      </List>
    );
  }

  renderItem = ({ hostname, ...rest }) => {
    return (
      <ListItem>
        <ListItemText primary={hostname} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Add" onClick={this.handleAdd({ hostname, ...rest })}>
            <AddIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  handleAdd = details => () => {
    this.props.handleChoose(details);
  };
}
