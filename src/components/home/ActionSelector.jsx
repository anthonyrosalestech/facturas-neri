const actions = [
  {
    key: "create",
    label: "Crear Nuevo",
    icon: "bi bi-file-earmark-plus",
    color: "primary",
  },
  {
    key: "load",
    label: "Cargar Existente",
    icon: "bi bi-folder-symlink",
    color: "secondary",
  },
];

const ActionSelector = ({ onSelect }) => (
  <div className="row justify-content-center g-4 mb-5">
    {actions.map((action) => (
      <div key={action.key} className="col-md-4">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <i
              className={`${action.icon} display-4 text-${action.color} mb-3`}
            ></i>
            <h5 className="card-title">{action.label}</h5>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onSelect(action.key)}
            >
              {action.label}
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ActionSelector;
