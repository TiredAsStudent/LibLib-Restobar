import toast from "react-hot-toast";

const baseStyle =
  "max-w-xs w-full text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2";

const CustomToast = {
  success: (message) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } ${baseStyle} bg-green-500`}
      >
        <span>{message}</span>
      </div>
    ));
  },

  error: (message) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } ${baseStyle} bg-red-500`}
      >
        <span>{message}</span>
      </div>
    ));
  },
};

export default CustomToast;
