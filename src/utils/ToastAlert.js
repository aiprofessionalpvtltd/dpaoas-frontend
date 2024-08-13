import { toast } from "react-toastify";

export const showSuccessMessage = (message, autoclose) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    autoClose: autoclose ?  false : true,
    hideProgressBar: false,
  });
};

export const showErrorMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
  });
};
