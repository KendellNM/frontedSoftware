import React from "react";

const Label = ({
  htmlFor,
  children,
  required = false,
  disabled = false,
  className = "",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium mb-1 ${sizeClasses[size]} ${
        disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
      } ${className}`}
    >
      {children}
      {required && (
        <span className="text-red-500 ml-0.5" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};

Label.displayName = "Label";

export default Label;
