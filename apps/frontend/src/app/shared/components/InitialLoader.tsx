import React from 'react';
import './css/InitialLoader.scss';

export const InitialLoader = () => {
  return (
    <div className="loader_container">
      <div className="loader"></div>
      <div className="shadow"></div>
    </div>
  );
};
