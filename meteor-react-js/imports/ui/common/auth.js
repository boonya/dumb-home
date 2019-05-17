import { createSelector } from "reselect";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";

import ROUTES from "../../routes";
import Preloader from "../common/Preloader";
import { isReady, isLoading } from "../redux/utils/valueState";

const isAuthSelector = createSelector(
  ({ me }) => isReady(me) && !!me,
  isAuth => isAuth
);

const isNotAuthSelector = createSelector(
  ({ me }) => isReady(me) && !me,
  isNotAuth => isNotAuth
);

const isLoadingSelector = createSelector(
  ({ me }) => isLoading(me),
  isLoading => isLoading
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
