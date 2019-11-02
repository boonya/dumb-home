import PropTypes from "prop-types";

import CameraIcon from "@material-ui/icons/CameraAlt";

import DEVICES from "../devices";

import CameraDiscovery from "./containers/Device/Camera/Discovery";
import CameraDetails from "./containers/Device/Camera/Details";
import CameraEdit from "./containers/Device/Camera/Edit";

export const CAMERA_TYPE = PropTypes.shape({
  _id: PropTypes.string,
  type: PropTypes.exact(DEVICES.CAMERA),
  hostname: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
});

export default {
  [DEVICES.CAMERA]: {
    label: "Camera",
    Icon: CameraIcon,
    CreateFlow: CameraDiscovery,
    DetailsFlow: CameraDetails,
    EditFlow: CameraEdit,
  },
};
