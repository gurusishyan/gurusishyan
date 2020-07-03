import React from 'react';
import { render } from '@testing-library/react';

import CustomButtom from './custom-button';

describe('CustomButtom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomButtom> </CustomButtom>);

    expect(baseElement).toBeTruthy();
  });
});
