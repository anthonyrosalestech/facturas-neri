import React from "react";
import EditableCell from "./EditableCell";
import ActionButtons from "./ActionButtons";

export default function TableRow({
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
    <tr>
      <td>{index + 1}</td>
      {columns.map((col) => (
        <td key={col.key}>
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
        </td>
      ))}
      <td>
        <ActionButtons {...{ isEditing, onEdit, onDelete, onSave, index }} />
      </td>
    </tr>
  );
}
