import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

class ToastContainerComponent extends Component {
  render() {
    return <ToastContainer autoClose={2000} />;
  }
}

export default ToastContainerComponent;
