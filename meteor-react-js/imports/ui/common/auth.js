import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";
import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";

import ROUTES from "../../routes";
import Preloader from '../common/Preloader';
import { isReady } from '../redux/utils/valueState';

export const isAuth = ({ me }) => isReady(me) && !!me;

export const authOnly = connectedRouterRedirect({
  redirectPath: ROUTES.Login,
  authenticatedSelector: state => isAuth(state),
  AuthenticatingComponent: Preloader,
  wrapperDisplayName: "UserIsAuthenticated",
});

export const noAuthOnly = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelperBuilder({}).getRedirectQueryParam(ownProps) || ROUTES.Landing,
  allowRedirectBack: false,
  authenticatedSelector: state => !isAuth(state),
  wrapperDisplayName: "UserIsNotAuthenticated",
});
