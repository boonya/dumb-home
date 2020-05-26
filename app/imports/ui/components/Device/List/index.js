import PropTypes from 'prop-types';
import React from 'react';
import {
  List,
  Typography,
  Grid,
} from '@material-ui/core';
import Item from './Item';
import Preloader from '../../Preloader';

export default function DeviceList({ list, loading, onSelect, onDelete }) {
  const content = React.useMemo(() => {
    if (list.length < 1) {
      return <Typography>There is no device to display</Typography>;
    }

    return (
      <List>
        {list.map(({ _id, ...rest }) => (
          <Item
            key={_id}
            id={_id}
            {...rest}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
      </List>
    );
  }, [list, onSelect, onDelete]);

  return (
    <Grid container direction="column">
      {loading && <Preloader />}
      <Typography variant="h1">Device List</Typography>
      {content}
    </Grid>
  );
}

DeviceList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string.isRequired })).isRequired,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

DeviceList.defaultProps = {
  loading: false,
};
