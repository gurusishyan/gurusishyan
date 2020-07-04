import React from 'react';
import './custom-button.styles.css';

export const CustomButton = ({ children, ...otherprops }) => (
  <button {...otherprops}>{children}</button>
);
