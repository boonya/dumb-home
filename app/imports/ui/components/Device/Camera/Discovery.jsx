import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Preloader from "../../Preloader";

class Discovery extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    List: PropTypes.node.isRequired,
    handleDiscovery: PropTypes.func.isRequired
  };

  render() {
    const { loading, ready, List } = this.props;

    return (
      <Grid container direction="column" alignItems="center" spacing={8}>
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
    this.props.handleDiscovery();
  };
}

export default Discovery;
