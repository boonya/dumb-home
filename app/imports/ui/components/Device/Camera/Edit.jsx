import PropTypes from 'prop-types';
import React from 'react';

import Grid from '@material-ui/core/Grid';

import Preloader from '../../Preloader';
import CameraForm from './Form';

export const CAMERA_TYPE = PropTypes.shape({
  label: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  details: PropTypes.shape({ hostname: PropTypes.string.isRequired }).isRequired,
});

const PROP_TYPES = {
  details: CAMERA_TYPE.isRequired,
  loading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

const Edit = ({ loading, details: { label, username, password, details }, handleChange, handleCancel }) => (
  <Grid>
    {loading && <Preloader />}
    <CameraForm
      label={label}
      username={username}
      password={password}
      hostname={details.hostname}
      port={details.port}
      onSubmit={handleChange}
      onCancel={handleCancel}
    />
  </Grid>
);

Edit.propTypes = PROP_TYPES;

export default Edit;
