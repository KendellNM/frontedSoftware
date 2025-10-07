import React, { createContext, useState, useCallback } from "react";
import ToastContainer from "../components/molecules/ToastContainer";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children, position = "top-right" }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now() + Math.random();
    
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (message, duration) => addToast(message, "success", duration),
    error: (message, duration) => addToast(message, "error", duration),
    warning: (message, duration) => addToast(message, "warning", duration),
    info: (message, duration) => addToast(message, "info", duration),
    remove: removeToast
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer 
        toasts={toasts} 
        position={position}
        onClose={removeToast}
      />
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = "ToastProvider";