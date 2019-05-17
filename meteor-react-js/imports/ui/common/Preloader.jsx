import PropTypes from "prop-types";
import React from "react";
import { withStyles } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

const Preloader = ({ classes }) => (
  <div className={classes.overlay}>
    <div className={classes.circular}> </div>
  </div>
);

Preloader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(
  theme => ({
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1100,
      backgroundColor: "rgba(48, 48, 48, .7)",
      transition: "0.5s linear all",
    },
    circular: {
      display: "block",
      position: "relative",
      left: "50%",
      top: "50%",
      width: 100,
      height: 100,
      margin: "-75px 0 0 -75px",
      borderRadius: "50%",
      border: "3px solid transparent",
      animation: "spin 2s linear infinite",
      borderTopColor: theme.palette.primary.main,
      "&:before": {
        content: '""',
        position: "absolute",
        borderRadius: "50%",
        border: "3px solid transparent",
        animation: "spin 3s linear infinite",
        borderTopColor: theme.palette.secondary.main,
        top: 5,
        left: 5,
        right: 5,
        bottom: 5,
      },
      "&:after": {
        content: '""',
        position: "absolute",
        borderRadius: "50%",
        border: "3px solid transparent",
        animation: "spin 1.5s linear infinite",
        borderTopColor: yellow["A400"],
        top: 15,
        left: 15,
        right: 15,
        bottom: 15,
      },
    },
    "@keyframes spin": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
  }),
  { name: "Preloader" }
)(Preloader);
