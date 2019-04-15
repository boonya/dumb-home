import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Typography, Avatar, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/delete";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import ROUTES from "../../../../routes";
import { actions } from "../../../redux/actions/device";
import Preloader from "../../../common/Preloader";
import DEVICES from "../../../devices";

import withStyles from "./styles";

class DeviceList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    pending: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.object,
    list: PropTypes.array,
    fetchList: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    pending: true,
    loading: false,
    error: null,
    list: [],
  };

  componentDidMount() {
    this.props.fetchList();
  }

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

  renderList = list => <GridList cols={3}>{list.map(this.renderItem)}</GridList>;

  renderItem = ({ _id, title, type }) => {
    const { classes } = this.props;
    const Icon = DEVICES[type].icon;
    return (
      <GridListTile key={`grid-list-item-${_id}`} className={classes.tile}>
        <Link to={ROUTES.DeviceDetails.replace(":id", _id)}>
          <Avatar>
            <Icon />
          </Avatar>
          <Typography>{title}</Typography>
        </Link>
        <Button size="small" onClick={this.handleDelete(_id)}><DeleteIcon/></Button>
      </GridListTile>
    );
  };

  renderNothing = () => <Typography variant="body1">There is no device to display</Typography>;

  handleDelete = (id) => () => confirm('Delete?') && this.props.delete(id);
}

const mapStateToProps = ({ device }) => ({ ...device.list });

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(actions.deviceList()),
  delete: (id) => dispatch(actions.deviceDelete(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(DeviceList));
