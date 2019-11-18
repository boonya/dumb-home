import PropTypes from 'prop-types';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Preloader from '../../Preloader';
import VideoPlayer from '../../VideoPlayer/StreamPlayer';

const Watch = ({ id, loading, handleDetails }) => (
  <Grid>
    {loading && <Preloader />}
    <Button onClick={handleDetails}>See properties</Button>
    <VideoPlayer src={`/camera/${id}`} />
  </Grid>
);

Watch.propTypes = {
  id: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleDetails: PropTypes.func.isRequired,
};

export default Watch;
