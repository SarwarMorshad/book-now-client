import { FaQuestion, FaExclamationTriangle, FaCheck, FaTimes } from "react-icons/fa";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "question", // question, warning, danger, success
  loading = false,
}) => {
  if (!isOpen) return null;

  const typeConfig = {
    question: {
      icon: FaQuestion,
      iconBg: "bg-blue-100",
      iconColor: "text-primary",
      confirmBg: "bg-primary hover:bg-blue-700",
    },
    warning: {
      icon: FaExclamationTriangle,
      iconBg: "bg-orange-100",
      iconColor: "text-secondary",
      confirmBg: "bg-secondary hover:bg-orange-600",
    },
    danger: {
      icon: FaExclamationTriangle,
      iconBg: "bg-red-100",
      iconColor: "text-error",
      confirmBg: "bg-error hover:bg-red-600",
    },
    success: {
      icon: FaCheck,
      iconBg: "bg-green-100",
      iconColor: "text-success",
      confirmBg: "bg-success hover:bg-green-600",
    },
  };

  const config = typeConfig[type] || typeConfig.question;
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-fadeInUp">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 ${config.iconBg} rounded-full flex items-center justify-center`}>
            <Icon className={`text-2xl ${config.iconColor}`} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>

        {/* Message */}
        <div className="text-gray-600 text-center mb-6">{message}</div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 px-4 bg-base-200 text-gray-700 font-semibold rounded-xl hover:bg-base-300 transition-all disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 py-3 px-4 text-white font-semibold rounded-xl transition-all disabled:opacity-50 ${config.confirmBg}`}
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
