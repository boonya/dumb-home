import 'typeface-roboto';

import React from 'react';
import { Provider } from 'react-redux';

import { createBrowserHistory as createHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Config from '../config';
import theme from './theme';
import ROUTES from './routes';
import loadable from './loadable';
import { authOnly, noAuthOnly } from './auth';
import { createRootEpic } from './redux';
import configureStore from './configureStore';

import Notifications from './containers/Notifications';

const title = Config.APP_TITLE;
const config = { appPrefix: '', title };
const locale = 'en';
const initialState = { config, locale };

const history = createHistory({ basename: config.appPrefix.slice(0, -1) });
const rootEpic = createRootEpic();
export const store = configureStore(initialState, rootEpic, history);

const Login = loadable(() => import(/* webpackChunkName: "Login" */ './pages/Login'));
const Dashboard = loadable(() => import(/* webpackChunkName: "Dashboard" */ './pages/Dashboard'));
const CreateDevice = loadable(() => import(/* webpackChunkName: "CreateDevice" */ './pages/CreateDevice'));
const DeviceDetails = loadable(() => import(/* webpackChunkName: "DeviceDetails" */ './pages/DeviceDetails'));
const EditDevice = loadable(() => import(/* webpackChunkName: "EditDevice" */ './pages/EditDevice'));
const NotFound404 = loadable(() => import(/* webpackChunkName: "NotFound404" */ './pages/NotFound404'));

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <meta charSet="utf-8" />
        <html lang={locale} />
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#1B267C" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
        <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
      </Helmet>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path={ROUTES.Login} component={noAuthOnly(Login)} />
          <Route exact path={ROUTES.Landing} component={authOnly(Dashboard)} />
          <Route exact path={ROUTES.CreateDevice} component={authOnly(CreateDevice)} />
          <Route exact path={ROUTES.DeviceDetails} component={authOnly(DeviceDetails)} />
          <Route exact path={ROUTES.EditDevice} component={authOnly(EditDevice)} />
          <Route component={NotFound404} />
        </Switch>
      </ConnectedRouter>
      <Notifications />
    </MuiThemeProvider>
  </Provider>
);

export default App;
