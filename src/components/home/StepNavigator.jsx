const StepNavigator = ({ currentStep, onBack, onNext, maxSteps = 2 }) => (
  <div className="col-12 d-flex justify-content-between mt-4">
    <button className="btn btn-outline-secondary" onClick={onBack}>
      Volver al inicio
    </button>

    <button
      className="btn btn-primary"
      disabled={currentStep === maxSteps}
      onClick={() => onNext()}
    >
      Siguiente
    </button>
  </div>
);

export default StepNavigator;
