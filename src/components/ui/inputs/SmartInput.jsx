import React from "react";

const SmartInput = ({
  id,
  label,
  type = "text", // "text", "textarea", "password", etc.
  placeholder = "",
  value,
  onChange,
  className = "",
  rows = 4, // solo usado por textarea
  disabled = false,
}) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="form-label fw-bold">
          {label}
        </label>
      )}

      {type === "textarea" ? (
        <textarea
          className={`form-control ${className}`}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
        />
      ) : (
        <input
          type={type}
          className={`form-control ${className}`}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default SmartInput;
