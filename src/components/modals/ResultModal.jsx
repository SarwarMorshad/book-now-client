import { useEffect } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const ResultModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "success", // success, error
  autoClose = 2000,
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    success: {
      icon: FaCheck,
      iconBg: "bg-green-100",
      iconColor: "text-success",
      borderColor: "border-success",
    },
    error: {
      icon: FaTimes,
      iconBg: "bg-red-100",
      iconColor: "text-error",
      borderColor: "border-error",
    },
  };

  const config = typeConfig[type] || typeConfig.success;
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 animate-fadeInUp">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 ${config.iconBg} rounded-full flex items-center justify-center border-4 ${config.borderColor}`}
          >
            <Icon className={`text-2xl ${config.iconColor}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>

        {/* Message */}
        <div className="text-gray-600 text-center">{message}</div>

        {/* Progress Bar */}
        {autoClose && (
          <div className="mt-4 h-1 bg-base-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${type === "success" ? "bg-success" : "bg-error"} animate-shrink`}
              style={{ animationDuration: `${autoClose}ms` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultModal;
