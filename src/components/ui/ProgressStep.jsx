import React, { useState } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";

export default function ProgressStep({
  steps = [], // Pasos dinámicos
  currentStep: externalStep, // Estado controlado opcional
  setCurrentStep: setExternalStep,
  onStepChange, // Callback cuando cambia de paso
  disableClick = false, // Para desactivar clicks
  size = 40, // Tamaño de los círculos
  activeColor = "bg-primary text-white border-primary",
  inactiveColor = "border-secondary bg-white",
}) {
  const [internalStep, setInternalStep] = useState(0);
  const currentStep = externalStep ?? internalStep;
  const setCurrentStep = setExternalStep ?? setInternalStep;

  const handleStepClick = (index) => {
    if (disableClick) return;
    setCurrentStep(index);
    if (onStepChange) onStepChange(index);
  };

  return (
    <div className="container text-center mt-4">
      <div className="d-flex justify-content-between align-items-center position-relative mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="d-flex flex-column align-items-center w-100"
            onClick={() => handleStepClick(index)}
            style={{ cursor: disableClick ? "default" : "pointer" }}
          >
            <div
              className={`d-flex align-items-center justify-content-center rounded-circle border ${
                index <= currentStep ? activeColor : inactiveColor
              }`}
              style={{ width: size, height: size }}
            >
              {index < currentStep ? (
                <CheckCircleFill size={size * 0.5} />
              ) : (
                index + 1
              )}
            </div>
            <span className="mt-2">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
