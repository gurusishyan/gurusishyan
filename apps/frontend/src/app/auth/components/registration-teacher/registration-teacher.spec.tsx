import React from 'react';
import { render } from '@testing-library/react';

import RegistrationTeacher from './registration-teacher';

describe(' RegistrationTeacher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RegistrationTeacher />);
    expect(baseElement).toBeTruthy();
  });
});
