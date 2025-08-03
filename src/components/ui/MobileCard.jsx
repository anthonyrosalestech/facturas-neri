import React from "react";
import EditableCell from "./EditableCell";
import ActionButtons from "./ActionButtons";

export default function MobileCard({
  item,
  index,
  columns,
  editingIndex,
  onChange,
  onEdit,
  onDelete,
  onSave,
}) {
  const isEditing = editingIndex === index;
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">#{index + 1}</h5>
        {columns.map((col) => (
          <div key={col.key} className="mb-2">
            <strong>{col.label}:</strong>{" "}
            {col.render ? (
              col.render(item[col.key], item)
            ) : (
              <EditableCell
                editable={isEditing && col.editable}
                value={item[col.key]}
                type={col.type}
                name={col.key}
                onChange={(e) => onChange(e, index)}
              />
            )}
          </div>
        ))}
        <ActionButtons {...{ isEditing, onEdit, onDelete, onSave, index }} />
      </div>
    </div>
  );
}
