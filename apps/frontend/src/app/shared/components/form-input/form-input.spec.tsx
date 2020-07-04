import React from 'react';
import { render } from '@testing-library/react';

import { FormInput } from './form-input.component';

describe('CustomButtom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FormInput />);

    expect(baseElement).toBeTruthy();
  });
});
