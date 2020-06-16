import React from 'react';
import { Provider } from 'react-redux';

import './app.scss';
import configureStore from './store/configureStore';
import Auth from './auth/auth';

const store = configureStore();

export const App = () => {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
};

export default App;
