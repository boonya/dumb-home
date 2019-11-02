import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { isLoading } from "../redux/utils/state";
import { getMe } from "../redux/reducers/me";
import actions from "../redux/actions";

import Layout from "../containers/PageLayout";

import LoginForm, { FORM_STATES } from "../components/LoginForm";

const mapStateToProps = createSelector(
  [getMe],
  payload => ({
    state: isLoading(payload) ? FORM_STATES.LOADING : null
  })
);

const mapDispatchToProps = dispatch => ({
  handleLogin: params => dispatch(actions.me.login(params))
});

const LoginPage = ({ state, handleLogin }) => (
  <Layout withNavbar ContainerProps={{ container: true, justify: "center", alignItems: "center" }}>
    <LoginForm state={state} handleSubmit={handleLogin} />
  </Layout>
);

LoginPage.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  state: PropTypes.oneOf(Object.values(FORM_STATES))
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
