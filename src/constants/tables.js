// Configuración de columnas para la tabla de servicios
export const SERVICE_COLUMNS = [
  { key: "productName", label: "Servicio", editable: true },
  { key: "productDescription", label: "Descripción", editable: true },
  { key: "quantity", label: "Cantidad", editable: true, type: "number" },
  {
    key: "price",
    label: "P/U",
    editable: true,
    type: "number",
    render: (val) => `$${val}`,
  },
  {
    key: "subtotal",
    label: "Subtotal",
    render: (_, item) => `$${(item.quantity * item.price).toFixed(2)}`,
  },
];
