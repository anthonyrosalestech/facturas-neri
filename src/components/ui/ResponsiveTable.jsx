import React from "react";
import TableRow from "./TableRow";
import MobileCard from "./MobileCard";

export default function ResponsiveTable({
  data = [],
  columns = [],
  editingIndex,
  onEdit,
  onSave,
  onDelete,
  onChange,
}) {
  return (
    <>
      <div className="table-responsive d-none d-md-block">
        <table className="table table-striped table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                {...{
                  item,
                  index,
                  columns,
                  editingIndex,
                  onEdit,
                  onDelete,
                  onSave,
                  onChange,
                }}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-block d-md-none">
        {data.map((item, index) => (
          <MobileCard
            key={index}
            {...{
              item,
              index,
              columns,
              editingIndex,
              onEdit,
              onDelete,
              onSave,
              onChange,
            }}
          />
        ))}
      </div>
    </>
  );
}
