import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import reducers from 'reducers';

const makeStore = (context) => createStore(reducers);
const wrapper = createWrapper(makeStore);

export default wrapper;
