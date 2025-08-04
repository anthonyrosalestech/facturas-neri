const ProcessLoader = ({ processes, selectedProcess, onSelect, onBack }) => (
  <div className="row justify-content-center">
    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
      <div className="card custom-card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3 text-center">Seleccionar Proceso</h5>

          <div className="mb-3">
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
                  {p.id} — {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onBack}
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProcessLoader;

