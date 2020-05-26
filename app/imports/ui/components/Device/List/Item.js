import PropTypes from 'prop-types';
import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Grid,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DEVICES from '../../../devices';
import RecLabel from '../../VideoPlayer/RecordingLabel';

export default function Item({ id, label, type, recording, onSelect, onDelete }) {
  const handleSelect = React.useCallback(() => {
    onSelect(id);
  }, [onSelect, id]);

  const handleDelete = React.useCallback(() => {
    if (confirm('Delete?')) {
      onDelete(id);
    }
  }, [onDelete, id]);

  const Icon = React.useMemo(() => (type && DEVICES[type] ? DEVICES[type].Icon : null), []);

  const primary = React.useMemo(() => (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          {recording && <RecLabel />}
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  ), [label, recording, handleDelete]);

  return (
    <ListItem button onClick={handleSelect}>
      {Icon && (
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
      )}
      <ListItemText primary={primary} />
    </ListItem>
  );
}

Item.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  recording: PropTypes.bool.isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
};

Item.defaultProps = {
  onSelect: () => null,
  onDelete: () => null,
};
