import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Preloader from '../../Preloader';

class Discovery extends PureComponent {
  render() {
    const { loading, ready, List } = this.props;

    return (
      <Grid container direction="column" alignItems="center" spacing={1}>
        {loading && <Preloader />}
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.handleDiscovery} disabled={loading}>
            Discover onvif IP cams in your network
          </Button>
        </Grid>
        {ready && <Grid item>{List}</Grid>}
      </Grid>
    );
  }

  handleDiscovery = () => {
    const { handleDiscovery } = this.props;
    handleDiscovery();
  };
}

Discovery.propTypes = {
  loading: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  List: PropTypes.node.isRequired,
  handleDiscovery: PropTypes.func.isRequired,
};

export default Discovery;
