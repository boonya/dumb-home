import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  title: PropTypes.node.isRequired,
  logout: PropTypes.func.isRequired,
  landingPath: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool,
};

Navbar.defaultProps = {
  isLoggedIn: false,
};

export const styles = {
  root: {
    flexGrow: 0,
  },
  title: {
    flex: 1,
    fontSize: 25,
  },
};

export default withStyles(styles)(Navbar);
