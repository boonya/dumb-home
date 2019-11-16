import PropTypes from 'prop-types';
import React, { PureComponent, Fragment } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

class CameraList extends PureComponent {
  render() {
    const { items } = this.props;

    return (
      <List>
        {items.map(({ hostname, ...rest }) => (
          <Fragment key={hostname}>{this.renderItem({ hostname, ...rest })}</Fragment>
        ))}
      </List>
    );
  }

  renderItem = ({ hostname, ...rest }) => (
    <ListItem>
      <ListItemText primary={hostname} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Add" onClick={this.handleAdd({ hostname, ...rest })}>
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  handleAdd = (details) => () => {
    const { handleChoose } = this.props;
    handleChoose(details);
  };
}

const CAMERA_TYPE = PropTypes.shape({
  hostname: PropTypes.string.isRequired,
});

CameraList.propTypes = {
  items: PropTypes.arrayOf(CAMERA_TYPE).isRequired,
  handleChoose: PropTypes.func.isRequired,
};

export default CameraList;
