import PropTypes from 'prop-types';
import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Layout from '../containers/PageLayout';

const GeneralError = ({ error, retry }) => {
  if (error) {
    console.error(error);
  }

  return (
    <Layout withNavbar ContainerProps={{ container: true, justify: 'center', alignItems: 'center' }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h1">Something went wrong</Typography>
        <Typography variant="h2">An error occured.</Typography>
        <Button onClick={retry}>Retry</Button>
      </Grid>
    </Layout>
  );
};

GeneralError.propTypes = {
  retry: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
};

GeneralError.defaultProps = {
  error: null,
};

export default GeneralError;
