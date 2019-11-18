import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Overlay from './Overlay';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    '&::-webkit-media-controls-enclosure': {
      display: 'none !important',
    },
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
}));

const onCanPlayThrough = (setState) => () => setState({ waiting: false });
const onWaiting = (setState) => () => setState({ waiting: true });
const onProgress = (setState) => () => setState({ waiting: false });
const onError = (setState) => () => setState({ waiting: false, error: true });

const effect = ({ videoRef, setState }) => () => {
  const video = videoRef.current;
  /**
   * Events we could subscribe for https://developer.mozilla.org/uk/docs/Web/HTML/%D0%95%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82/video#Events
   */
  video.addEventListener('canplaythrough', onCanPlayThrough(setState));
  video.addEventListener('progress', onProgress(setState));
  video.addEventListener('waiting', onWaiting(setState));
  video.addEventListener('error', onError(setState));

  return () => {
    video.removeEventListener('canplaythrough', onCanPlayThrough(setState));
    video.removeEventListener('progress', onProgress(setState));
    video.removeEventListener('waiting', onWaiting(setState));
    video.removeEventListener('error', onError(setState));
    /**
     * Where this solution came from
     * https://stackoverflow.com/questions/3258587/how-to-properly-unload-destroy-a-video-element?answertab=votes#tab-top
     */
    video.pause();
    video.removeAttribute('src');
    video.load();
  };
};

const handleOnFullScreen = ({ videoRef, onFullScreen }) => () => {
  const video = videoRef.current;
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen(); // Firefox
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen(); // Chrome and Safari
  }
  onFullScreen && onFullScreen();
};

const onClick = (event) => event.preventDefault();

const VideoPlayer = ({
  waiting: waitingProp,
  error: errorProp,
  recording,
  onFullScreen,
  description,
  thumb,
  title,
  ...props
}) => {
  const classes = useStyles();
  const videoRef = useRef(null);
  const [state, setState] = useState({ waiting: false, error: false });
  useEffect(effect({ videoRef, setState }), [videoRef]);
  const waiting = state.waiting || waitingProp;
  const error = state.error || errorProp;

  return (
    <Grid className={classes.root} container>
      <video ref={videoRef} className={classes.video} onClick={onClick} {...props} />
      <Overlay
        className={classes.overlay}
        {...{ description, title, thumb, waiting, error }}
        onFullScreen={handleOnFullScreen({ videoRef, onFullScreen })}
      />
    </Grid>
  );
};

VideoPlayer.propTypes = {
  onFullScreen: PropTypes.func,
  recording: PropTypes.bool,
  waiting: PropTypes.bool,
};

VideoPlayer.defaultProps = {
  onFullScreen: null,
  recording: false,
  waiting: false,
};

export default VideoPlayer;
