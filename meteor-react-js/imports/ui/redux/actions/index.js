import { createActions } from "redux-actions";

import LOCALE from "./locale";
import NOTIFICATION from "./notification";
import ME from "./me";
import DEVICE_LIST from "./deviceList";
import DEVICE from "./device";
import CAMERA from "./camera";

export default createActions({ LOCALE, NOTIFICATION, ME, DEVICE_LIST, DEVICE, CAMERA });
