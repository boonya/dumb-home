import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { Portal } from "@material-ui/core";

import Notification from "../components/Notification";

import actions from "../redux/actions";
import { getNotification } from "../redux/reducers/notification";

const AUTO_HIDE_DURATION = 5000;

const Notifications = ({ list, handleClose }) => (
  <Portal>
    <>
      {list.map((props, index) => (
        <Notification
          key={`notification-${index + 1}`}
          {...props}
          open
          onClose={handleClose}
          autoHideDuration={AUTO_HIDE_DURATION}
        />
      ))}
    </>
  </Portal>
);

Notifications.propTypes = {
  list: PropTypes.array.isRequired,
  handleClose: PropTypes.func.isRequired,
};

const mapStateToProps = createSelector(
  getNotification,
  list => ({ list })
);

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(actions.notification.close()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
