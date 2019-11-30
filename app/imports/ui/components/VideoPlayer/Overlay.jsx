import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

import Info from './Info';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    // background: ({ thumb }) => (thumb ? `no-repeat center url(${thumb})` : null),
    // backgroundSize: ({ thumb }) => (thumb ? 'cover' : null),
  },
  grow: {
    flexGrow: 1,
  },
  progress: {
    height: 10,
    width: '100%',
  },
  error: {},
  controls: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },
}));

const Overlay = ({ className, waiting, error, recording, onFullScreen, description, title, thumb }) => {
  const classes = useStyles({ thumb });

  return (
    <Grid className={classnames(className, classes.root)} container direction="column">
      <Grid item className={classes.progress}>
        {waiting && <LinearProgress color="primary" />}
      </Grid>
      <Grid item>
        <Info {...{ title, description, recording, error }} />
      </Grid>
      <Grid item className={classes.grow} />
      <Grid item className={classes.controls} container justify="flex-end">
        <IconButton onClick={onFullScreen} aria-label="Go to fullscreen">
          <FullscreenIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

Overlay.propTypes = {
  className: PropTypes.string,
  onFullScreen: PropTypes.func,
  recording: PropTypes.bool,
  waiting: PropTypes.bool,
  error: PropTypes.bool,
  title: PropTypes.string,
  thumb: PropTypes.string,
  description: PropTypes.string,
};

Overlay.defaultProps = {
  className: null,
  onFullScreen: null,
  recording: false,
  waiting: false,
  error: false,
  description: null,
  thumb: null,
  title: null,
};

export default Overlay;
