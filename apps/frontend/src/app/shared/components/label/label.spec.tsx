import React from 'react';
import { render } from '@testing-library/react';

import { Label } from './label.component';

describe(' Label', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Label> </Label>);
    expect(baseElement).toBeTruthy();
  });
});
