import React from "react";
import { useServiceStore } from "@stores/servicesStore";

const ServiceList = () => {
  const {
    forms,
    editingIndex,
    updateFieldInForm,
    clearEditingIndex,
    setEditingIndex,
    removeFormByIndex,
  } = useServiceStore();

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    updateFieldInForm(index, name, value);
  };

  const handleSaveClick = () => {
    clearEditingIndex();
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  // Totales
  const totalCantidad = forms.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  );
  const totalPrecio = forms.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  if (forms.length === 0) {
    return <p className="text-muted">No hay servicios agregados todavía.</p>;
  }

  return (
    <>
      {/* Vista de tabla */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-striped table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Servicio</th>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>P/U</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>
                  {editingIndex === index ? (
                    <input
                      className="form-control"
                      type="text"
                      name="productName"
                      value={item.productName}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    item.productName
                  )}
                </td>

                <td>
                  {editingIndex === index ? (
                    <input
                      className="form-control"
                      type="text"
                      name="productDescription"
                      value={item.productDescription}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    item.productDescription
                  )}
                </td>

                <td>
                  {editingIndex === index ? (
                    <input
                      className="form-control"
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    item.quantity
                  )}
                </td>

                <td>
                  {editingIndex === index ? (
                    <input
                      className="form-control"
                      type="number"
                      name="price"
                      value={item.price}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  ) : (
                    `$${item.price}`
                  )}
                </td>

                <td>${(item.quantity * item.price).toFixed(2)}</td>

                <td>
                  {editingIndex === index ? (
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={handleSaveClick}
                    >
                      Guardar
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEditClick(index)}
                    >
                      Editar
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => removeFormByIndex(index)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="fw-bold">
              <td colSpan="3" className="text-end no-border">
                Totales:
              </td>
              <td>{totalCantidad}</td>
              <td className="no-border"></td>
              <td>${totalPrecio.toFixed(2)}</td>
              <td className="no-border"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Vista móvil */}
      {/* Vista móvil */}
      <div className="d-block d-md-none">
        {forms.map((item, index) => (
          <div className="card mb-3" key={index}>
            <div className="card-body">
              <h5 className="card-title">#{index + 1}</h5>

              <div className="mb-2">
                <strong>Servicio: </strong>
                {editingIndex === index ? (
                  <input
                    className="form-control"
                    type="text"
                    name="productName"
                    value={item.productName}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  item.productName
                )}
              </div>

              <div className="mb-2">
                <strong>Cantidad: </strong>
                {editingIndex === index ? (
                  <input
                    className="form-control"
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  item.quantity
                )}
              </div>

              <div className="mb-2">
                <strong>Precio unitario: </strong>
                {editingIndex === index ? (
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  `$${item.price}`
                )}
              </div>

              <div className="mb-2">
                <strong>Subtotal: </strong>$
                {(item.quantity * item.price).toFixed(2)}
              </div>

              <div className="d-flex gap-2 mt-2">
                {editingIndex === index ? (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={handleSaveClick}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEditClick(index)}
                  >
                    Editar
                  </button>
                )}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFormByIndex(index)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="card bg-light shadow-sm mb-3">
          <div className="card-body text-center">
            <h5 className="card-title fw-bold">Resumen</h5>
            <p className="card-text mb-1">
              <strong>Total de productos:</strong> {totalCantidad}
            </p>
            <p className="card-text mb-0">
              <strong>Total a pagar:</strong> ${totalPrecio.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceList;

