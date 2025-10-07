import React, { forwardRef } from "react";

const sizeMap = {
  sm: "text-sm py-1 px-2",
  md: "text-base py-2 px-3",
  lg: "text-lg py-3 px-4",
};

const Input = forwardRef(
  (
    {
      id,
      type = "text",
      value,
      defaultValue,
      onChange,
      placeholder = "",
      error = false,
      size = "md",
      disabled = false,
      readOnly = false,
      className = "",
      icon = null,
      name,
      inputMode,
      autoComplete,
      required = false,
      ...props
    },
    ref
  ) => {
    const hasIcon = Boolean(icon);

    const base = `w-full rounded-md border bg-white transition-all duration-200 ${
      sizeMap[size] || sizeMap.md
    }`;

    const stateClasses = [
      error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500",
      disabled
        ? "bg-gray-100 cursor-not-allowed opacity-60"
        : "hover:border-gray-400",
      readOnly ? "bg-gray-50 cursor-default" : "",
      "focus:outline-none focus:ring-2 focus:border-transparent",
    ]
      .filter(Boolean)
      .join(" ");

    const paddingLeft = hasIcon ? "pl-10" : "";

    return (
      <div className={`relative ${className}`}>
        {hasIcon && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${
              error
                ? "text-red-400"
                : disabled
                ? "text-gray-300"
                : "text-gray-400"
            }`}
          >
            {icon}
          </div>
        )}

        <input
          id={id}
          name={name}
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error}
          inputMode={inputMode}
          autoComplete={autoComplete}
          required={required}
          className={`${base} ${stateClasses} ${paddingLeft}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
