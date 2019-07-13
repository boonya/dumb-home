import PropTypes from "prop-types";
import React, { Component } from "react";

class VideoPlayer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.video = React.createRef();
  }

  componentWillUnmount() {
    this.video.current.pause();
  }

  render() {
    const { id } = this.props;

    return (
      <video
        ref={this.video}
        width="100%"
        preload="none"
        autoPlay={true}
        controls={true}
        src={`/camera/${id}`}
        type="video/mp4"
      >
        Video stream is not available
      </video>
    );
  }
}

export default VideoPlayer;
