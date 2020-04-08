import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import uniqueId from 'lodash/uniqueId';

import { isReady, isLoading } from '../redux/utils/state';
import actions from '../redux/actions';
import { getDeviceList } from '../redux/reducers/deviceList';

import DEVICES from '../devices';
import ROUTES, { goTo } from '../routes';
import Layout from '../containers/PageLayout';

import DeviceList, { DEVICE_TYPE } from '../components/Device/List';
import CreateButton from '../components/CreateButton';
import PopoverMenu from '../components/PopoverMenu';

const mapStateToProps = createSelector([getDeviceList], (devices) => ({
  devices: isReady(devices) ? devices : [],
  loading: isLoading(devices),
}));

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(actions.deviceList.fetch()),
  handleDelete: (id) => dispatch(actions.device.delete(id)),
  handleCreate: (type) => dispatch(goTo(ROUTES.CreateDevice, { type })),
  handleSelect: (id) => dispatch(goTo(ROUTES.DeviceDetails, { id })),
});

class DashboardPage extends PureComponent {
  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { devices, loading, handleSelect, handleDelete, handleCreate } = this.props;

    return (
      <Layout withNavbar>
        <DeviceList list={devices} loading={loading} onSelect={handleSelect} onDelete={handleDelete} />
        <CreateButton id={uniqueId()}>
          <PopoverMenu items={this.getDevices()} onSelect={handleCreate} />
        </CreateButton>
      </Layout>
    );
  }

  getDevices = () => Object.keys(DEVICES).map((key) => ({ key: key.toLowerCase(), ...DEVICES[key] }));
}

DashboardPage.propTypes = {
  devices: PropTypes.arrayOf(DEVICE_TYPE).isRequired,
  fetch: PropTypes.func.isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

DashboardPage.defaultProps = {
  loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
