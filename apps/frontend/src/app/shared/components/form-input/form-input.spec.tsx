import React from 'react';
import { render } from '@testing-library/react';

import { FormInput } from './form-input.component';

describe('FormInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInput />);

    expect(baseElement).toBeTruthy();
  });
});
