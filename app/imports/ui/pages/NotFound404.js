import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Layout from '../containers/PageLayout';

const NotFound404 = () => (
  <Layout withNavbar ContainerProps={{ container: true, justify: 'center', alignItems: 'center' }}>
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography variant="h1">Error 404</Typography>
      <Typography variant="h2">Not found</Typography>
    </Grid>
  </Layout>
);

export default NotFound404;
