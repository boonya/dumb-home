import PropTypes from 'prop-types';
import React from 'react';
import Loadable from 'react-loadable';

import Preloader from './components/Preloader';
import GeneralError from './pages/GeneralError';

const Loading = ({ pastDelay, timedOut, error, retry }) => {
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

Loading.propTypes = {
  pastDelay: PropTypes.bool.isRequired,
  timedOut: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
  error: PropTypes.instanceOf(Error),
};

Loading.defaultProps = {
  error: null,
};

export default (loader) => Loadable({
  loader,
  loading: Loading,
  delay: 300, // 0.3 seconds
  timeout: 10000, // 10 seconds
});
