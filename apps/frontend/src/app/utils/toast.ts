import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const errorToast = (message: string) => {
    toast.error(message);
}

