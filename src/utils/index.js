export function calcularTotalCosto(ventas) {
  return ventas.reduce((total, venta) => {
    const cantidad = parseFloat(venta.quantity) || 0;
    const precio = parseFloat(venta.price) || 0;
    return total + cantidad * precio;
  }, 0);
}

export const fillTemplate = (html, data) => {
  console.log(data);
  return html
    .replace(/{{name}}/g, data.name)
    .replace(/{{mail}}/g, data.mail)
    .replace(/{{dir}}/g, data.dir)
    .replace(/{{comment}}/g, data.comment)
    .replace(/{{telephone}}/g, data.telephone)
    .replace(/{{date}}/g, new Date().toLocaleDateString())
    .replace(/{{table}}/g, data.table)
    .replace(/{{total}}/g, data.total.toFixed(2));
};
