import { toast } from "react-toastify";

const DEFAULT_SETTINGS = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
};

const MSG_TYPE = {
  success: (msg, customOption) => {
    toast.success(msg, {
      ...DEFAULT_SETTINGS,
      className: "custom-success-toast",
      ...customOption,
    });
  },
  error: (msg, customOption) => {
    toast.error(msg, {
      ...DEFAULT_SETTINGS,
      className: "custom-error-toast",
      ...customOption,
    });
  },
  warn: (msg, customOption) => {
    toast.warn(msg, {
      ...DEFAULT_SETTINGS,
      ...customOption,
    });
  },
  info: (msg, customOption) => {
    toast.info(msg, {
      ...DEFAULT_SETTINGS,
      ...customOption,
    });
  },
  default: (msg, customOption) => {
    toast(msg, {
      ...DEFAULT_SETTINGS,
      ...customOption,
    });
  },
};

/**
 * This function provide message string for Notification according to status code provided.
 * @param {number} status - Http status code
 *
 * @returns {string} - Message to show
 */
export const msgGenerator = (status = 500) => {
  if (status === 400) {
    return "Please provide valid details";
  }
  if (status === 401) {
    return "Unauthorized access";
  }
  if (status === 403) {
    return "Session expired or invalid token";
  }
  return "Something went wrong at our side";
};

/**
 * This Function is Show Notifications toast.
 *
 * @param {import('react-toastify').ToastContent} content - Notification Content.
 * @param {('success' | 'error' | 'warn' | 'info' | 'default')} type - Type of notification.
 * @param {import('react-toastify').ToastOptions} customOptions - Options for notification.
 *
 * @returns {void} -
 *
 */
export default (content, type = "success", customOption = {}) => {
  if (customOption.toastId && !toast.isActive(customOption.toastId)) {
    MSG_TYPE[type](content, customOption);
  } else if (!customOption.toastId) {
    MSG_TYPE[type](content, { ...customOption });
  }
};
