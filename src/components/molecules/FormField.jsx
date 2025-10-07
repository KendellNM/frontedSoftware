import React from "react";
import Input from "../atoms/Input";
import Label from "../atoms/Label";

const FormField = ({
  id,
  label,
  error,
  required = false,
  className = "",
  labelSize = "md",
  helpText,
  ...inputProps
}) => {
  const fieldId = id || inputProps.name;
  const errorId = error ? `${fieldId}-error` : undefined;
  const helpTextId = helpText ? `${fieldId}-help` : undefined;
  const describedBy =
    [errorId, helpTextId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      {label && (
        <Label
          htmlFor={fieldId}
          required={required}
          disabled={inputProps.disabled}
          size={labelSize}
        >
          {label}
        </Label>
      )}

      <Input
        id={fieldId}
        error={!!error}
        aria-describedby={describedBy}
        required={required}
        {...inputProps}
      />

      {helpText && !error && (
        <p id={helpTextId} className="mt-1 text-sm text-gray-500">
          {helpText}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

FormField.displayName = "FormField";

export default FormField;
