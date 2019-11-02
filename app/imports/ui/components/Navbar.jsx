import PropTypes from "prop-types";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, Typography, Link, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const Navbar = ({ classes, title, landingPath, isLoggedIn, logout }) => (
  <AppBar position="relative" className={classes.root}>
    <Toolbar>
      <Typography variant="h1" className={classes.title}>
        <Link color="inherit" component={RouterLink} to={landingPath} className={classes.link}>
          {title}
        </Link>
      </Typography>
      {isLoggedIn && (
        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      )}
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func.isRequired
};

Navbar.defaulProps = {
  isLoggedIn: false
};

export default withStyles({
  root: {
    flexGrow: 0
  },
  title: {
    flex: 1,
    fontSize: 25
  }
})(Navbar);
