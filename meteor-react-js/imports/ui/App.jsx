import "typeface-roboto";

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import loadableComponents from "loadable-components";

import { MuiThemeProvider, withStyles } from "@material-ui/core/styles";
import { CssBaseline, Grid } from "@material-ui/core";

import Config from "../config";
import ROUTES from "../routes";
import { authOnly, noAuthOnly } from "./common/auth";

import Theme from "./Theme";
import Header from "./Header";

import LoadingComponent from "./common/Preloader";
// import ErrorComponent from "./common/Error";

const loadable = loader =>
  loadableComponents(loader, {
    LoadingComponent,
    // ErrorComponent
  });

const Login = loadable(() => import(/* webpackChunkName: "Login"*/ "./pages/Login"));
const Devices = loadable(() => import(/* webpackChunkName: "Devices"*/ "./pages/Devices"));
const DeviceDetails = loadable(() => import(/* webpackChunkName: "DeviceDetails"*/ "./pages/Devices/Details"));
const NotFound404 = loadable(() => import(/* webpackChunkName: "NotFound404"*/ "./pages/NotFound404"));

const App = ({ classes }) => (
  <MuiThemeProvider theme={Theme}>
    <Helmet>
      <title>{Config.APP_TITLE}</title>
    </Helmet>
    <CssBaseline />
    <BrowserRouter>
      <Grid container direction="column">
        <Header>{Config.APP_TITLE}</Header>
        <Grid className={classes.container}>
          <Switch>
            <Route exact path={ROUTES.Login} component={noAuthOnly(Login)} />
            <Route exact path={ROUTES.Landing} component={authOnly(Devices)} />
            <Route exact path={ROUTES.DeviceDetails} component={authOnly(DeviceDetails)} />
            <Route component={NotFound404} />
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
  </MuiThemeProvider>
);

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = ({ spacing }) => ({
  container: {
    padding: spacing.unit,
  },
});

export default withStyles(styles)(App);
