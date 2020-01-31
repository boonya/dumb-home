import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PROP_TYPES = {
  label: PropTypes.string,
  hostname: PropTypes.string,
  port: PropTypes.number,
  username: PropTypes.string,
  password: PropTypes.string,
  readOnly: PropTypes.bool,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

const DEFAULT_PROPS = {
  label: null,
  hostname: null,
  port: null,
  username: null,
  password: null,
  readOnly: false,
  onSubmit: () => null,
  onCancel: undefined,
};

class CameraForm extends PureComponent {
  render() {
    const { label, hostname, port, username, password, readOnly } = this.props;

    return (
      <form onSubmit={this.onSubmit}>
        <Grid container justify="space-around">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  name="label"
                  label="label"
                  defaultValue={label}
                  required
                  InputProps={{ readOnly }}
                  fullWidth
                />
              </Grid>

              <Grid item>
                <TextField
                  name="hostname"
                  label="hostname"
                  defaultValue={hostname}
                  required
                  disabled={Boolean(hostname && hostname.trim().length)}
                  fullWidth
                />
              </Grid>

              <Grid item>
                <TextField
                  name="port"
                  label="port"
                  type="number"
                  defaultValue={port}
                  required
                  disabled={Boolean(port)}
                  fullWidth
                />
              </Grid>

              <Grid item>
                <TextField
                  name="username"
                  label="username"
                  defaultValue={username}
                  required
                  InputProps={{ readOnly }}
                  fullWidth
                />
              </Grid>

              <Grid item>
                <TextField
                  name="password"
                  label="password"
                  type="password"
                  defaultValue={password}
                  InputProps={{ readOnly }}
                  fullWidth
                />
              </Grid>

              {!readOnly && (
                <Grid item>
                  {this.renderButtons()}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }

  isCancelable = () => {
    const { onCancel } = this.props;
    return Boolean(onCancel);
  };

  getValue = (formElement, key) => formElement.elements[key].value.trim();

  onSubmit = (event) => {
    event.preventDefault();

    const label = this.getValue(event.target, 'label');
    const hostname = this.getValue(event.target, 'hostname');
    const port = Number(this.getValue(event.target, 'port'));
    const username = this.getValue(event.target, 'username');
    const password = this.getValue(event.target, 'password');

    const { onSubmit } = this.props;

    onSubmit({ label, hostname, port, username, password });
  };

  onCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  renderButtons = () => (
    <Grid container justify="space-between">
      {this.isCancelable() && (
        <Button variant="contained" color="default" onClick={this.onCancel}>
          Cancel
        </Button>
      )}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Grid>
  );
}

CameraForm.propTypes = PROP_TYPES;
CameraForm.defaultProps = DEFAULT_PROPS;

export default CameraForm;
