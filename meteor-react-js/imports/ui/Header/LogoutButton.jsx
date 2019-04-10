import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";

import { actions } from "../redux/actions/logout";

class LogoutButton extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Button color="inherit" onClick={this.handleClick}>
        Logout
      </Button>
    );
  }

  handleClick = event => {
    event.preventDefault();
    this.props.dispatch(actions.logoutRequest());
  };
}

export default connect()(LogoutButton);
