import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import Routes from "../routes";

import actions from "../redux/actions";

import { isReady } from "../redux/utils/state";
import { getMe } from "../redux/reducers/me";
import { getTitle } from "../redux/reducers/config";

import Layout from "../components/PageLayout";

const NavbarPropsSelector = createSelector(
  [getMe, getTitle],
  (me, title) => ({
    isLoggedIn: isReady(me) && me.isLoggedIn(),
    title,
    landingPath: Routes.Landing,
    toggleMenu: null
  })
);

const mapStateToProps = createSelector(
  [NavbarPropsSelector],
  NavbarProps => ({
    NavbarProps
  })
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.me.logout())
});

const PageLayout = ({ children, logout, NavbarProps, ContainerProps, withNavbar }) => (
  <Layout NavbarProps={withNavbar && { ...NavbarProps, logout }} ContainerProps={ContainerProps}>
    {children}
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  logout: PropTypes.func.isRequired,
  NavbarProps: PropTypes.object.isRequired,
  ContainerProps: PropTypes.object,
  withNavbar: PropTypes.bool
};

PageLayout.defaultProps = {
  withNavbar: false,
  ContainerProps: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageLayout);
