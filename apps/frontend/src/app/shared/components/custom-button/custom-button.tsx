import React from 'react';
import './custom-button.css';

const CustomButton = ({ children, ...otherprops }) => (
  <button {...otherprops}>{children}</button>
);

export default CustomButton;
