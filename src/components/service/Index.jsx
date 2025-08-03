import React, { useState, useEffect } from "react";
import SmartInput from "@components/ui/inputs/SmartInput";
import { SERVICE_FORM_FIELDS } from "../../constants/forms";
import { useServiceStore } from "@stores/servicesStore";
import { useProcessStore } from "@stores/processStore";
import { showAlert } from "@utils/alert";
import { generateId } from "@utils/idGenerator";

const Service = () => {
  const addFormToList = useServiceStore((state) => state.addFormToList);
  const resetForm = useServiceStore((state) => state.resetForm);

  const updateProcess = useProcessStore((state) => state.updateProcess);
  const selectedProcessId = useProcessStore((state) => state.selectedProcessId);
  const processes = useProcessStore((state) => state.processes);

  const initialService = {
    productName: "",
    productDescription: "",
    quantity: "",
    price: "",
    subTotal: "",
  };

  const [service, setService] = useState(initialService);

  useEffect(() => {
    if (!selectedProcessId) {
      setService(initialService);
      resetForm();
    }
  }, [selectedProcessId, resetForm]);

  const handleChange = (e, setData) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newService = { ...service, id: generateId() };

    addFormToList(newService);

    if (selectedProcessId) {
      const selected = processes.find((p) => p.id === selectedProcessId);
      if (selected) {
        const updatedServices = [...selected.services, newService];
        updateProcess(selectedProcessId, { services: updatedServices });
      }
    }

    showAlert({
      title: "Servicio agregado",
      text: "El servicio se ha agregado correctamente.",
      icon: "success",
    });

    setService(initialService);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit}>
      {SERVICE_FORM_FIELDS.map((field) =>
        field.type === "textarea" ? (
          <div className="mb-3" key={field.id}>
            <label htmlFor={field.id} className="form-label fw-bold">
              {field.label}
            </label>
            <textarea
              id={field.id}
              className="form-control"
              rows={field.rows}
              placeholder={field.placeholder}
              value={service[field.id]}
              onChange={(e) => handleChange(e, setService)}
            />
          </div>
        ) : (
          <SmartInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            value={service[field.id]}
            onChange={(e) => handleChange(e, setService)}
            className="mb-3"
          />
        )
      )}

      <button type="submit" className="btn btn-success">
        Agregar servicio
      </button>
    </form>
  );
};

export default Service;
