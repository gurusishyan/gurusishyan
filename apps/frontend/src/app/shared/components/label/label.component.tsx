import React from 'react';

import './label.styles.scss';

export const Label = ({ children, ...otherprops }) => {
  return <label {...otherprops}> {children} </label>;
};
