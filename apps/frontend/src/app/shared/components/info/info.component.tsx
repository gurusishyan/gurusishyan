import React from 'react';

import './info.styles.scss';

export const Info = ({ children, ...otherprops }) => {
  return (
    <small className="form-text text-muted" {...otherprops}>
      {' '}
      {children}{' '}
    </small>
  );
};
