import React from "react";

export default function EditableCell({
  editable,
  value,
  type = "text",
  name,
  onChange,
}) {
  if (editable) {
    return (
      <input
        className="form-control"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    );
  }
  return <>{value}</>;
}
