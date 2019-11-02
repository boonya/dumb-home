import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import { isReady, isLoading } from "../redux/utils/state";
import actions from "../redux/actions";
import { getDeviceList } from "../redux/reducers/deviceList";

import DEVICES from "../devices";
import ROUTES, { goTo } from "../routes";
import Layout from "../containers/PageLayout";

import DeviceList from "../components/Device/List";
import CreateButton from "../components/CreateButton";
import PopoverMenu from "../components/PopoverMenu";

const mapStateToProps = createSelector(
  [getDeviceList],
  devices => ({
    devices: isReady(devices) ? devices : [],
    loading: isLoading(devices)
  })
);

const mapDispatchToProps = dispatch => ({
  fetch: () => dispatch(actions.deviceList.fetch()),
  handleDelete: id => dispatch(actions.device.delete(id)),
  handleCreate: type => dispatch(goTo(ROUTES.CreateDevice, { type })),
  handleSelect: id => dispatch(goTo(ROUTES.DeviceDetails, { id }))
});

class DashboardPage extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    devices: PropTypes.array.isRequired,
    fetch: PropTypes.func.isRequired,
    handleCreate: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { devices, loading } = this.props;

    return (
      <Layout withNavbar>
        <DeviceList
          list={devices}
          loading={loading}
          onSelect={this.props.handleSelect}
          onDelete={this.props.handleDelete}
        />
        <CreateButton>
          <PopoverMenu items={this.getDevices()} onSelect={this.props.handleCreate} />
        </CreateButton>
      </Layout>
    );
  }

  getDevices = () => {
    return Object.keys(DEVICES).map(key => ({ key: key.toLowerCase(), ...DEVICES[key] }));
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
