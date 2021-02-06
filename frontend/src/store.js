import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import reducers from 'reducers';
import { windowSupported } from 'utils/checkSupport';

const devtools = () => {
  return (
    windowSupported() &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

const makeStore = (context) => createStore(reducers, devtools());

const wrapper = createWrapper(makeStore);

export default wrapper;
