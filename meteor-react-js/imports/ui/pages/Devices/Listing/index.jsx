import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Typography, List, ListItem, ListItemText, Avatar } from "@material-ui/core";
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

  // renderList = list => <List>{list.map(this.renderItem)}</List>;
  renderList = list => <GridList cols={3}>{list.map(this.renderItem)}</GridList>;

  // renderItem = ({ _id, title, type }) => {
  //   const Icon = DEVICES[type].icon;
  //   return (
  //     <Link key={`device-key-${_id}`} to={ROUTES.DeviceDetails.replace(":id", _id)}>
  //       <ListItem dense>
  //         <Avatar>
  //           <Icon />
  //         </Avatar>
  //         <ListItemText primary={title} />
  //       </ListItem>
  //     </Link>
  //   );
  // };
  renderItem = ({ _id, title, type }) => {
    const {classes} = this.props;
    const Icon = DEVICES[type].icon;
    return (
      <GridListTile className={classes.tile}>
        <Avatar>
          <Icon />
        </Avatar>
      </GridListTile>
    );
  };

  renderNothing = () => <Typography variant="body1">There is no device to display</Typography>;
}

const mapStateToProps = ({ device }) => ({ ...device.list });

const mapDispatchToProps = dispatch => ({
  fetchList: () => dispatch(actions.deviceList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(DeviceList));
