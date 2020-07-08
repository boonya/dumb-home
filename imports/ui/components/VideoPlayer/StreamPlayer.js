import React from 'react';

import VideoPlayer from '.';

export default function StreamPlayer(props) {
  return (
    <VideoPlayer
      preload="none"
      autoPlay
      type="video/mp4"
      {...props}
    />
  );
}
