import PropTypes from 'prop-types';
import React from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Button,
  Avatar,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DEVICES from '../../../devices';

export default function Item({ id, label, type, onSelect, onDelete }) {
  const handleSelect = React.useCallback(() => {
    onSelect(id);
  }, [onSelect, id]);

  const handleDelete = React.useCallback(() => {
    if (confirm('Delete?')) {
      onDelete(id);
    }
  }, [onDelete, id]);

  const Icon = React.useMemo(() => (type && DEVICES[type] ? DEVICES[type].Icon : null), []);

  return (
    <ListItem button onClick={handleSelect}>
      <ListItemAvatar>
        <Avatar>{Icon && <Icon />}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={label} />
      <ListItemSecondaryAction>
        <Button size="small" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
};

Item.defaultProps = {
  onSelect: () => null,
  onDelete: () => null,
};
