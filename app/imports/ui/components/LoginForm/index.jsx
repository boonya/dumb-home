import PropTypes from "prop-types";
import React, { Component } from "react";

import { FormControl, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const FORM_STATES = {
  DISABLED: "DISABLED",
  LOADING: "LOADING",
};

class Form extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    state: PropTypes.oneOf([...Object.values(FORM_STATES), null]),
    handleSubmit: PropTypes.func.isRequired,
  };

  state = { email: "", password: "" };

  render() {
    const { classes } = this.props;
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
            disabled={this.isDisabled()}
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
            disabled={this.isDisabled()}
            error={false}
            required={true}
          />
        </FormControl>

        <FormControl margin={"dense"}>
          <Button type={"submit"} disabled={this.isDisabled()}>
            Submit
          </Button>
        </FormControl>
      </form>
    );
  }

  isDisabled = () => [FORM_STATES.DISABLED, FORM_STATES.LOADING].includes(this.props.state);

  handleChange = name => ({ target }) => this.setState({ [name]: target.value });

  handleSubmit = event => {
    event.preventDefault();
    if (this.isDisabled()) {
      return;
    }
    this.props.handleSubmit(this.state);
  };
}

export const styles = ({ spacing }) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    width: 400,
  },
  textField: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
  },
});

export default withStyles(styles)(Form);
