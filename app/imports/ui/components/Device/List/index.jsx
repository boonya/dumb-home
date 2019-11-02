import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";

import DEVICES from "../../../devices";

import Preloader from "../../Preloader";

const ITEM_TYPE = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
});

class DeviceList extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.arrayOf(ITEM_TYPE).isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    loading: false
  };

  render() {
    const { list, loading } = this.props;

    return (
      <>
        {loading && <Preloader />}
        <Typography variant="h1">Device List</Typography>
        {list.length > 0 ? this.renderList(list) : this.renderNothing()}
      </>
    );
  }

  renderList = list => (
    <List>
      {list.map(item => (
        <Fragment key={`grid-list-item-${item.id}`}>{this.renderItem(item)}</Fragment>
      ))}
    </List>
  );

  renderItem = ({ _id, label, type }) => {
    const Icon = type ? DEVICES[type].Icon : null;

    return (
      <ListItem button onClick={this.handleSelect(_id)}>
        <ListItemAvatar>
          <Avatar>{Icon && <Icon />}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={label} />
        <ListItemSecondaryAction>
          <Button size="small" onClick={this.handleDelete(_id)}>
            <DeleteIcon />
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  renderNothing = () => <Typography variant="body1">There is no device to display</Typography>;

  handleSelect = id => () => this.props.onSelect(id);

  handleDelete = id => () => confirm("Delete?") && this.props.onDelete(id);
}

export default DeviceList;
