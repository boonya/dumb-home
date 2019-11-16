import PropTypes from 'prop-types';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Preloader from '../../Preloader';
import CameraFrom from './Form';

const Details = ({ loading, handleWatch, handleEdit, details: { label, username, password, details } }) => (
  <Grid>
    {loading && <Preloader />}
    <Button onClick={handleWatch}>Watch stream</Button>
    <Button onClick={handleEdit}>Edit</Button>
    <CameraFrom readOnly label={label} username={username} password={password} details={details} />
  </Grid>
);

export const CAMERA_TYPE = PropTypes.shape({
  label: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  details: PropTypes.shape({ hostname: PropTypes.string.isRequired }).isRequired,
});

Details.propTypes = {
  details: CAMERA_TYPE.isRequired,
  loading: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleWatch: PropTypes.func.isRequired,
};

export default Details;
