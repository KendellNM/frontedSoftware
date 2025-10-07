import React from "react";
import Toast from "../atoms/Toast";

const positions = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2"
};

const ToastContainer = ({ 
  toasts = [], 
  position = "top-right",
  onClose 
}) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className={`fixed z-50 flex flex-col gap-3 ${positions[position] || positions["top-right"]}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

ToastContainer.displayName = "ToastContainer";

export default ToastContainer;