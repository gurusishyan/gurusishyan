import React from 'react';
import { render } from '@testing-library/react';

import { CustomButton } from './custom-button.component';

describe('CustomButtom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CustomButton> </CustomButton>);

    expect(baseElement).toBeTruthy();
  });
});
