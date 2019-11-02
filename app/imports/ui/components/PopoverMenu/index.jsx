import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const ITEM_TYPE = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
});

export default class PopoverMenu extends PureComponent {
  static propTypes = {
    items: PropTypes.arrayOf(ITEM_TYPE).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  render() {
    const { items } = this.props;

    return (
      <Paper>
        <MenuList>{items.map(this.renderItem)}</MenuList>
      </Paper>
    );
  }

  renderItem = ({ key, label, Icon }) => {
    return (
      <MenuItem key={label} onClick={this.handleSelect(key)}>
        {Icon && this.renderIcon(Icon)}
        <ListItemText inset={Boolean(Icon)} primary={label} />
      </MenuItem>
    );
  };

  renderIcon = Icon => {
    return (
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
    );
  };

  handleSelect = type => () => this.props.onSelect(type);
}
