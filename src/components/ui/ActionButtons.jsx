import React from "react";

export default function ActionButtons({
  isEditing,
  onEdit,
  onDelete,
  onSave,
  index,
}) {
  return (
    <div className="d-flex gap-2">
      {isEditing ? (
        <button className="btn btn-sm btn-success" onClick={onSave}>
          Guardar
        </button>
      ) : (
        <button
          className="btn btn-sm btn-primary"
          onClick={() => onEdit(index)}
        >
          Editar
        </button>
      )}
      <button className="btn btn-sm btn-danger" onClick={() => onDelete(index)}>
        Eliminar
      </button>
    </div>
  );
}
