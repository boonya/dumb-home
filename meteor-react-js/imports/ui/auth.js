import { createSelector } from "reselect";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";

import ROUTES from "./routes";
import Preloader from "./components/Preloader";

import { getMe } from './redux/reducers/me';
import { isReady, isLoading } from "./redux/utils/state";

const isAuthSelector = createSelector(
  getMe,
  (me) => isReady(me) && me && me.isLoggedIn(),
);

const isNotAuthSelector = createSelector(
  getMe,
  (me) => !isReady(me) || !me || !me.isLoggedIn(),
);

const isLoadingSelector = createSelector(
  getMe,
  (me) => isLoading(me),
);

const getBackRedirectPath = (_, ownProps) => {
  return locationHelperBuilder({}).getRedirectQueryParam(ownProps) || ROUTES.Landing;
};

export const authOnly = connectedRouterRedirect({
  redirectPath: ROUTES.Login,
  authenticatedSelector: isAuthSelector,
  authenticatingSelector: isLoadingSelector,
  AuthenticatingComponent: Preloader,
  wrapperDisplayName: "UserIsAuthenticated",
});

export const noAuthOnly = connectedRouterRedirect({
  redirectPath: getBackRedirectPath,
  allowRedirectBack: false,
  authenticatedSelector: isNotAuthSelector,
  authenticatingSelector: isLoadingSelector,
  AuthenticatingComponent: Preloader,
  wrapperDisplayName: "UserIsNotAuthenticated",
});
