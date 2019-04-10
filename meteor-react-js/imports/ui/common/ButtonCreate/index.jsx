import PropTypes from "prop-types";
import React from "react";

import Button from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import withStyles from "./styles";

const ButtonCreate = ({ classes, onClick }) => (
  <Button color={`secondary`} className={classes.floatButton} onClick={onClick}>
    <AddIcon />
  </Button>
);

ButtonCreate.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(ButtonCreate);
