import React from 'react';

export const CustomButton = ({ children, ...otherprops }) => (
  <button {...otherprops}>
    <span> {children} </span>
  </button>
);
