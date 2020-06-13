import React from 'react';
import { render } from '@testing-library/react';

import RegistrationStudent from './registration-student';

describe(' RegistrationStudent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegistrationStudent />);
    expect(baseElement).toBeTruthy();
  });
});
