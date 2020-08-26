import React from 'react';
import { render } from '@testing-library/react';

import ResetPassword from './reset-password';
import { Provider } from 'react-redux';
import { store } from '../../../store/configureStore';

describe(' ResetPassword', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Provider store={store}>
        {' '}
        <ResetPassword />{' '}
      </Provider>
    );
    expect(baseElement).toBeTruthy();
  });
});
