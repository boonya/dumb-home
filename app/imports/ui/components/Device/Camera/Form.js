import PropTypes from "prop-types";
import React, { PureComponent } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class CameraForm extends PureComponent {
  static propTypes = {
    label: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
    details: PropTypes.shape({ hostname: PropTypes.string.isRequired }).isRequired,
    readOnly: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleCancel: PropTypes.func
  };

  static defaultProps = {
    label: "",
    username: "",
    password: "",
    readOnly: false,
    handleSubmit: () => null,
    handleCancel: undefined
  };

  constructor(props) {
    super(props);

    const { label, username, password } = props;
    const { hostname } = props.details;

    this.state = {
      label: label || hostname,
      username,
      password
    };
  }

  render() {
    const { readOnly } = this.props;
    const { hostname } = this.props.details;
    const { label, username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container spacing={8}>
          <Grid item xs={12} container justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <TextField name="hostname" label="hostname" value={hostname} disabled fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <TextField
                name="label"
                label="label"
                value={label}
                required
                onChange={this.handleChange}
                InputProps={{ readOnly }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <TextField
                name="username"
                label="username"
                value={username}
                required
                onChange={this.handleChange}
                InputProps={{ readOnly }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <TextField
                name="password"
                label="password"
                type="password"
                value={password}
                onChange={this.handleChange}
                InputProps={{ readOnly }}
                fullWidth
              />
            </Grid>
          </Grid>
          {!readOnly && this.renderButtons()}
        </Grid>
      </form>
    );
  }

  renderButtons = () => {
    return (
      <Grid item xs={12} container justify="center">
        <Grid item xs={4} container justify="space-between">
          {this.isCancelable() && (
            <Button variant="contained" color="default" onClick={this.handleCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    );
  };

  isCancelable = () => Boolean(this.props.handleCancel);

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value.trim() });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { details } = this.props;
    this.props.handleSubmit({ ...this.state, details });
  };

  handleCancel = () => {
    this.props.handleCancel();
  };
}
