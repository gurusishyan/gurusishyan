import React from 'react';

export const Info = ({ children, ...otherprops }) => {
  return (
    <small className="form-text text-muted" {...otherprops}>
      {' '}
      {children}{' '}
    </small>
  );
};
