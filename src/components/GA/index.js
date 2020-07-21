ReactGA.initialize();

import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

function sendPageView(location) {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
}

function GAListener({ children, history }) {
  useEffect(() => {
    ReactGA.initialize('UA-173191894-1');
    sendPageView(history.location);
    return history.listen(sendPageView);
  }, [history, 'UA-173191894-1']);

  return children;
}

GAListener.propTypes = {
  children: PropTypes.node,
  history: PropTypes.shape({
    listen: PropTypes.func,
  }),
};

export default withRouter(GAListener);
