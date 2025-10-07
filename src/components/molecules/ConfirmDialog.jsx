import React from "react";
import Button from "../atoms/Button";

export const ConfirmDialog = ({ isOpen = false, title = "¿Estás seguro?", message = "Esta acción no se puede deshacer", confirmText = "Confirmar", cancelText = "Cancelar", variant = "danger", loading = false, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    const variants = {
      danger: { color: "red", bg: "bg-red-100" },
      warning: { color: "yellow", bg: "bg-yellow-100" },
      info: { color: "blue", bg: "bg-blue-100" }
    };
    const current = variants[variant] || variants.danger;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title" aria-describedby="confirm-dialog-message">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onCancel} />
          <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className={`flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto rounded-full ${current.bg} sm:mx-0 sm:h-10 sm:w-10`}>
                <svg className={`w-6 h-6 text-${current.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                <h3 id="confirm-dialog-title" className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                <div className="mt-2">
                  <p id="confirm-dialog-message" className="text-sm text-gray-500">{message}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
              <Button variant={variant} onClick={onConfirm} loading={loading} disabled={loading} type="button">
                {confirmText}
              </Button>
              <Button variant="outline" onClick={onCancel} disabled={loading} type="button">
                {cancelText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
 
 ConfirmDialog.displayName = "ConfirmDialog";
 export default ConfirmDialog;