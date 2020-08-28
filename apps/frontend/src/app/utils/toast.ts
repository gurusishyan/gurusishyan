import { toast } from 'react-toastify';

export const errorToast = (message: string) => {
  return toast.error(message, {
    className: 'snackbarClass',
    position: 'bottom-center',
    progressClassName: 'snackbarProgress',
  });
};

export const successToast = (message: string) => {
  return toast.success(message);
};
