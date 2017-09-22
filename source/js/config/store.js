import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';

import transit from 'transit-immutable-js';


import rootReducer from 'reducers';

const isProduction = process.env.NODE_ENV === 'production';

let INIT_STATE = null;

try {
  INIT_STATE = __MARVIN_DEHYDRATED_STATE; // eslint-disable-line no-undef
} catch (e) {
  console.log('Mavin: No dehydrated state'); // eslint-disable-line no-console
}

// Remove if you are not using server rendering
if (INIT_STATE) {
  INIT_STATE = transit.fromJSON(INIT_STATE);
}

// Creating store
export default () => {
  let store = null;
  let middleware = applyMiddleware(promise);


  // Add dehydrated state if any
  if (INIT_STATE) {
    // Remove if you are not using server rendering
    store = createStore(
      rootReducer,
      INIT_STATE,
      middleware
    );
  } else {
    store = createStore(
      rootReducer,
      middleware
    );
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
