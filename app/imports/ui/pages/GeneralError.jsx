import PropTypes from "prop-types";
import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Layout from "../containers/PageLayout";

const GeneralError = ({ error }) => {
  if (error) {
    console.error(error);
  }

  return (
    <Layout withNavbar ContainerProps={{ container: true, justify: "center", alignItems: "center" }}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h1">Something went wrong</Typography>
        <Typography variant="h2">An error occured.</Typography>
      </Grid>
    </Layout>
  );
};

GeneralError.propTypes = {
  error: PropTypes.object,
  retry: PropTypes.func.isRequired,
};

GeneralError.defaultProps = {
  error: null,
};

export default GeneralError;
