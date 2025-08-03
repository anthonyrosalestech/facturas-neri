import React from "react";
import { CheckCircleFill } from "react-bootstrap-icons";

export default function ProgressStep({ steps, currentStep, setCurrentStep }) {
  return (
    <div className="container text-center mt-4">
      <div className="d-flex justify-content-between align-items-center position-relative mb-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="d-flex flex-column align-items-center w-100"
            onClick={() => {
               setCurrentStep(index);
               console.log("Step clicked:", step, "at index:", index);
               console.log("Current step set to:", currentStep);
            }}
            style={{ cursor: "pointer" }}
          >
            <div
              className={`d-flex align-items-center justify-content-center rounded-circle border ${
                index <= currentStep
                  ? "bg-primary text-white border-primary"
                  : "border-secondary bg-white"
              }`}
              style={{ width: "40px", height: "40px" }}
            >
              {index < currentStep ? <CheckCircleFill size={20} /> : index + 1}
            </div>
            <span className="mt-2">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
