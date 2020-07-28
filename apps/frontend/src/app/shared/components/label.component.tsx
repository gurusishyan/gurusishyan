import React from 'react';

export const Label = ({ children, ...otherprops }) => {
  return <label {...otherprops}> {children} </label>;
};
