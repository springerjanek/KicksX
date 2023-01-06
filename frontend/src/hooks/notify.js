import { toast } from "react-toastify";

export const notify = (msg, type) => {
  toast(msg, {
    type: type,
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    pauseOnFocusLoss: false,
  });
  toast.clearWaitingQueue();
};
