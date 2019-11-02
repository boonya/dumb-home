import { push } from "connected-react-router";

const ROUTES = {
  Landing: "/",
  Dashboard: "/",
  Login: "/login",
  DeviceDetails: "/device/:id",
  CreateDevice: "/create-device/:type",
  EditDevice: "/edit-device/:id"
};

export const goTo = (route, params) => {
  const convert = (_, key) => params[key];
  return push(route.replace(/:([^\/]+)/g, convert));
};

export default ROUTES;
