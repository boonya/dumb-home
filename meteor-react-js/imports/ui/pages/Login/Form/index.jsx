import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

import { FormControl, TextField } from "@material-ui/core";

import ActiveButton from "../../../common/ActiveButton";
import { actions } from "../../../redux/actions/login";

import withStyles from "./styles";

class Form extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    state: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = { email: "", password: "" };

  render() {
    const { classes, state } = this.props;
    const { email, password } = this.state;
    return (
      <form className={classes.form} noValidate={false} autoComplete="off" onSubmit={this.handleSubmit}>
        <FormControl margin={"dense"}>
          <TextField
            label="Email"
            type="email"
            className={classes.textField}
            value={email}
            onChange={this.handleChange("email")}
            error={false}
            required={true}
          />
        </FormControl>

        <FormControl margin={"dense"}>
          <TextField
            label="Password"
            type="password"
            className={classes.textField}
            value={password}
            onChange={this.handleChange("password")}
            error={false}
            required={true}
          />
        </FormControl>

        <FormControl margin={"dense"}>
          <ActiveButton type={"submit"} disabled={state === "DISABLED"} pending={state === "PENDING"}>
            Submit
          </ActiveButton>
        </FormControl>
      </form>
    );
  }

  handleChange = name => ({ target }) => this.setState({ [name]: target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.dispatch(actions.loginRequest(this.state));
  };
}

export default connect()(withStyles(Form));
