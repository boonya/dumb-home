import PropTypes from "prop-types";
import React, { Component } from "react";

import { FormControl, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import ActiveButton from "./ActiveButton";

export const FORM_STATES = {
  DISABLED: "DISABLED",
  LOADING: "LOADING"
};

class Form extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    state: PropTypes.oneOf([...Object.values(FORM_STATES), null]),
    handleSubmit: PropTypes.func.isRequired
  };

  state = { email: "", password: "" };

  render() {
    const { classes, state } = this.props;
    const { email, password } = this.state;

    return (
      <form className={classes.form} noValidate={false} onSubmit={this.handleSubmit}>
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
          <ActiveButton
            type={"submit"}
            disabled={state === FORM_STATES.DISABLED}
            pending={state === FORM_STATES.LOADING}
          >
            Submit
          </ActiveButton>
        </FormControl>
      </form>
    );
  }

  handleChange = name => ({ target }) => this.setState({ [name]: target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state);
  };
}

export default withStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: 400
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
}))(Form);
