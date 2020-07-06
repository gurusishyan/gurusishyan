import React from 'react';
import { render } from '@testing-library/react';

import { Spinner } from './spinner.component';

describe(' Spinner', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Spinner />);
    expect(baseElement).toBeTruthy();
  });
});
