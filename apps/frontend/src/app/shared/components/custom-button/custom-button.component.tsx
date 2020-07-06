import React from 'react';
import './custom-button.styles.scss';

export const CustomButton = ({ children, ...otherprops }) => (
  <button {...otherprops}>{children}</button>
);
