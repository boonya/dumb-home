import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

class PopoverMenu extends PureComponent {
  render() {
    const { items } = this.props;

    return (
      <Paper>
        <MenuList>{items.map(this.renderItem)}</MenuList>
      </Paper>
    );
  }

  renderItem = ({ key, label, Icon }) => (
    <MenuItem key={label} onClick={this.handleSelect(key)}>
      {Icon && this.renderIcon(Icon)}
      <ListItemText inset={Boolean(Icon)} primary={label} />
    </MenuItem>
  );

  renderIcon = (Icon) => (
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
  );

  handleSelect = (type) => () => {
    const { onSelect } = this.props;
    onSelect(type);
  };
}

const ITEM_TYPE = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
});

PopoverMenu.propTypes = {
  items: PropTypes.arrayOf(ITEM_TYPE).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PopoverMenu;
