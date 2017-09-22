import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import configureStore from 'config/store';
import Main from 'views';

import es6Promise from 'es6-promise';
import 'isomorphic-fetch';

import '../scss/app.scss';

es6Promise.polyfill();

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={ store }>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

// Render app
render(Main);
