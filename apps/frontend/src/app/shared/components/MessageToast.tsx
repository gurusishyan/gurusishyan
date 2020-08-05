import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { closeToast } from '../../store/toast-store/actions';

const MessageToast = () => {
  const toastState = useSelector((state: any) => state.toast);
  const dispatch = useDispatch();

  const { toastVisibility, toastMessage, isError } = toastState;

  const showToast = () => {
    toast.error(toastMessage, { onClose: onToastClose });
  };

  const onToastClose = () => {
    dispatch(closeToast());
  };

  return (
    <div>
      {toastVisibility && isError ? showToast() : ''}
      {toastVisibility ? (
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default MessageToast;
