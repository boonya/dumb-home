import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import RecordingLabel from './RecordingLabel';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  title: {
    overflow: 'hidden',
  },
}));

// eslint-disable-next-line no-unused-vars
const Info = ({ className, title, description, recording, error }) => {
  const classes = useStyles();

  return (
    <Grid className={classnames(className, classes.root)} container justify="space-between">
      <Grid container justify="space-between" wrap="nowrap">
        <Grid className={classes.title}>{title && <Typography noWrap>{title}</Typography>}</Grid>
        <Grid>{recording && <RecordingLabel />}</Grid>
      </Grid>
      <Grid container>
        {error && (
          <Grid container justify="center" alignItems="center">
            <Typography color="error">Something went wrong</Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

Info.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  error: PropTypes.bool,
  recording: PropTypes.bool,
};

Info.defaultProps = {
  className: null,
  title: null,
  description: null,
  recording: false,
  error: false,
};

export default Info;
