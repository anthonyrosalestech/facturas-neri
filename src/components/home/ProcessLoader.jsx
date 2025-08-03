const ProcessLoader = ({ processes, selectedProcess, onSelect, onBack }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="card custom-card">
        <div className="card-body">
          <h5 className="card-title">Seleccionar Proceso</h5>
          <select
            className="form-select"
            value={selectedProcess}
            onChange={(e) => {
              onSelect(e.target.value);
              console.log("Proceso seleccionado:", e.target.value);
            }}
          >
            <option value="">-- Selecciona un proceso --</option>
            {processes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} -- {p.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-outline-secondary mt-3"
            onClick={onBack}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProcessLoader;
