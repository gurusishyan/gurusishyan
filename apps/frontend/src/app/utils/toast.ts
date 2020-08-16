import { toast } from 'react-toastify';

export const errorToast = (message: string) => {
    return toast.error(message);
}

