import React from 'react';
import { render } from '@testing-library/react';

import { Info } from './info.component';

describe(' Label', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Info> </Info>);
    expect(baseElement).toBeTruthy();
  });
});
