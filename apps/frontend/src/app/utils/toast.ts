import { toast } from 'react-toastify';

export const errorToast = (message: string) => {
    return toast.error(message);
}

export const successToast = (message: string) => {
    return toast.success(message)
}