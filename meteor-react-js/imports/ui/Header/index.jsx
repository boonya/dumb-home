import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, Typography, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import LogoutButton from "./LogoutButton";
import routes from "../../routes";

const Header = ({ classes, children, isAuth }) => (
  <AppBar position="relative">
    <Toolbar className={classes.root}>
      <Typography variant="h6" className={classes.content}>
        <Link color="inherit" component={RouterLink} to={routes.Landing}>
          {children}
        </Link>
      </Typography>
      <div>{isAuth && <LogoutButton />}</div>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
};

Header.defaulProps = {
  isAuth: false,
};

export default connect(({ me }) => ({ isAuth: Boolean(me && me._id) }))(
  withStyles({
    root: {
      display: "flex",
      flexDirection: "row",
    },
    content: {
      flexGrow: 1,
    },
  })(Header)
);
