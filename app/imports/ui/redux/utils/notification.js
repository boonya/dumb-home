import actions from "../actions";
import { NOTIFICATION_TYPES } from "../../components/Notification";

export const notifyFailure = message => err => {
  console.error("Failure: ", { message, err });
  return actions.notification.show({ type: NOTIFICATION_TYPES.ERROR, message });
};
