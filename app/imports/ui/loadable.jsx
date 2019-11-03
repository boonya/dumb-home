import PropTypes from "prop-types";
import React from "react";
import Loadable from "react-loadable";

import Preloader from "./components/Preloader";
import GeneralError from "./pages/GeneralError";

const loading = props => {
  const { pastDelay, timedOut, error, retry } = props;

  if (error) {
    return <GeneralError error={error} retry={retry} />;
  }
  if (timedOut) {
    return <GeneralError retry={retry} />;
  }
  if (pastDelay) {
    return <Preloader />;
  }
  return null;
};

loading.propTypes = {
  pastDelay: PropTypes.bool.isRequired,
  timedOut: PropTypes.bool.isRequired,
  error: PropTypes.object,
  retry: PropTypes.func.isRequired,
};

export default loader =>
  Loadable({
    loader,
    loading,
    delay: 300, // 0.3 seconds
    timeout: 10000, // 10 seconds
  });
