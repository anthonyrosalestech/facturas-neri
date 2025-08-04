import { useState, useRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "@assets/transitions.css";

import { useProcessManager } from "@hooks/useProcessManager.js";
import ActionSelector from "@components/home/ActionSelector.jsx";
import ProcessLoader from "@components/home/ProcessLoader.jsx";

import CustomerStep from "@components/customer/CustomerStep.jsx";
import ServiceStep from "@components/service/ServiceStep.jsx";
import ServiceListStep from "@components/service_list/ServiceListStep.jsx";

import StepNavigator from "@components/home/StepNavigator.jsx";
import ProgressStep from "@components/home/ProgressStep.jsx";
import { useProcessStore } from "@stores/processStore.jsx";

const Home = () => {
  const [action, setAction] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProcess, setSelectedProcess] = useState("");

  const nodeRefSteps = useRef(null);
  const nodeRefSelectAction = useRef(null);
  const nodeRefCustomer = useRef(null);

  const { processes, loadProcess } = useProcessManager();
  const setSelectedProcessId = useProcessStore(
    (state) => state.setSelectedProcess
  );

  const steps = useMemo(() => {
    if (action === "create") return ["Cliente", "Servicios", "Vista previa"];
    if (action === "load") return ["Cliente", "Servicios", "Vista previa"];
    return [];
  }, [action]);

  const handleSelectProcess = (processId) => {
    setSelectedProcess(processId);
    setSelectedProcessId(processId);
    if (processId) loadProcess(processId);
  };

  const handleStartCreateNew = () => {
    setSelectedProcess("");
    setSelectedProcessId(null);
    setCurrentStep(0);
    setAction("create");
  };

  const handleGoBack = () => {
    setAction(null);
    setCurrentStep(0);
    setSelectedProcess("");
    setSelectedProcessId(null);
  };

  return (
    <div className="container py-4 mt-2">
      <TransitionGroup>
        {!action && (
          <CSSTransition
            nodeRef={nodeRefSelectAction}
            key="select-action"
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div ref={nodeRefSelectAction}>
              <ActionSelector
                onSelect={(selectedAction) => {
                  if (selectedAction === "create") {
                    handleStartCreateNew();
                  } else {
                    setAction(selectedAction);
                  }
                }}
              />
            </div>
          </CSSTransition>
        )}

        {action === "load" && !selectedProcess && (
          <CSSTransition
            nodeRef={nodeRefSelectAction}
            key="process-selection"
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div ref={nodeRefSelectAction}>
              <ProcessLoader
                processes={processes}
                selectedProcess={selectedProcess}
                onSelect={handleSelectProcess}
                onBack={handleGoBack}
              />
            </div>
          </CSSTransition>
        )}

        {(action === "create" || (action === "load" && selectedProcess)) && (
          <CSSTransition
            nodeRef={nodeRefCustomer}
            key="process-steps"
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div ref={nodeRefSteps} className="row gy-4 mb-5 pb-3">
              {/* ProgressStep en móvil ocupa todo arriba */}
              <div className="col-12 col-md-12">
                <ProgressStep
                  steps={steps}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
              </div>

              {/* Contenido dinámico de pasos */}
              <div className="col-12 col-md-12 pb-3">
                {action && currentStep === 0 && <CustomerStep />}
                {action && currentStep === 1 && <ServiceStep />}
                {action && currentStep === 2 && <ServiceListStep />}
              </div>

              {/* StepNavigator fijo en móvil */}
              {/* <div className="d-md-none position-fixed bottom-0 start-0 w-100 bg-white p-2 shadow">
                <StepNavigator
                  currentStep={currentStep}
                  onBack={handleGoBack}
                  onNext={() =>
                    setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
                  }
                  maxSteps={steps.length - 1}
                />
              </div>

              <div className="d-none d-md-block col-12 mt-3">
                <StepNavigator
                  currentStep={currentStep}
                  onBack={handleGoBack}
                  onNext={() =>
                    setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
                  }
                  maxSteps={steps.length - 1}
                />
              </div> */}
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>

      <div className="row">
        <div className="d-md-none position-fixed bottom-0 start-0 w-100 bg-white p-2 shadow">
          <StepNavigator
            currentStep={currentStep}
            onBack={handleGoBack}
            onNext={() =>
              setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
            }
            maxSteps={steps.length - 1}
          />
        </div>

        {/* En desktop normal */}
        <div className="d-none d-md-block col-12 mt-3">
          <StepNavigator
            currentStep={currentStep}
            onBack={handleGoBack}
            onNext={() =>
              setCurrentStep((s) => Math.min(steps.length - 1, s + 1))
            }
            maxSteps={steps.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
