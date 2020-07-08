import PropTypes from 'prop-types';
import React from 'react';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

import Navbar from './Navbar';

export const PageLayout = ({ classes, children, NavbarProps, ContainerProps }) => (
  <Grid container direction="column" wrap="nowrap" className={classes.root}>
    {NavbarProps && <Navbar {...NavbarProps} />}
    <Grid className={classes.container} {...ContainerProps}>
      {children}
    </Grid>
  </Grid>
);

PageLayout.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  NavbarProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  ContainerProps: PropTypes.object,
};

PageLayout.defaultProps = {
  NavbarProps: null,
  ContainerProps: null,
};

export default withStyles({
  root: {
    minHeight: '100%',
    overflow: 'hidden',
  },
  container: {
    flexGrow: 1,
  },
})(PageLayout);
