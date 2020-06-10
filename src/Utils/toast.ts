import toast, { CTMethod, CTOptions } from "cogo-toast";

const defOpts: CTOptions = {
  position: "top-right",
};

const error: CTMethod = (msg, options) => {
  return toast.error(msg, {
    ...defOpts,
    ...options,
  });
};

const success: CTMethod = (msg, options) => {
  return toast.success(msg, {
    ...defOpts,
    ...options,
  });
};

const info: CTMethod = (msg, options) => {
  return toast.info(msg, {
    ...defOpts,
    ...options,
  });
};

const loading: CTMethod = (msg, options) => {
  return toast.loading(msg, {
    ...defOpts,
    ...options,
  });
};

const warn: CTMethod = (msg, options) => {
  return toast.warn(msg, {
    ...defOpts,
    ...options,
  });
};

export default {
  success,
  error,
  warn,
  loading,
  info,
};
