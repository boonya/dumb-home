import PropTypes from 'prop-types';
import React from 'react';

import VideoPlayer from '.';

const StreamPlayer = (props) => <VideoPlayer preload="none" autoPlay type="video/mp4" {...props} />;

StreamPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default StreamPlayer;
