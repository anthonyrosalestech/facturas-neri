import React, { useState, useEffect } from "react";
import SmartInput from "@components/ui/inputs/SmartInput";
import { CUSTOMER_FORM_FIELDS } from "../../constants/forms";
import { useCustomerStore } from "@stores/customerStore";
import { useProcessStore } from "@stores/processStore";
import { showAlert } from "@utils/alert";
import { generateId } from "@utils/idGenerator";

const Customer = () => {
  const { setCustomerForm } = useCustomerStore();
  const addProcess = useProcessStore((state) => state.addProcess);
  const updateProcess = useProcessStore((state) => state.updateProcess);
  const setSelectedProcess = useProcessStore((state) => state.setSelectedProcess);
  const selectedProcessId = useProcessStore((state) => state.selectedProcessId);

  const initialCustomer = {
    customerName: "",
    customerEmail: "",
    customerTelephone: "",
    customerAddress: "",
    customerDescription: "",
  };

  const [customer, setCustomer] = useState(initialCustomer);

  useEffect(() => {
    if (selectedProcessId) {
      const selected = useProcessStore
        .getState()
        .processes.find((p) => p.id === selectedProcessId);
      if (selected) {
        setCustomer(selected.customer);
        setCustomerForm(selected.customer);
      }
    } else {
      // Sin proceso seleccionado, limpia formulario y store
      setCustomer(initialCustomer);
      setCustomerForm(initialCustomer);
    }
  }, [selectedProcessId, setCustomerForm]);

  const handleChange = (e, setData) => {
    const { id, value } = e.target;
    setData((prev) => {
      const updated = { ...prev, [id]: value };
      if (selectedProcessId) {
        updateProcess(selectedProcessId, { customer: updated });
        setCustomerForm(updated);
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedProcessId) {
      // Actualiza proceso existente
      updateProcess(selectedProcessId, { customer });
      showAlert({
        title: "Cliente actualizado",
        text: `El cliente fue actualizado en el proceso ${selectedProcessId}`,
        icon: "success",
      });
    } else {
      // Solicita nombre del nuevo proceso
      const { value: processName } = await showAlert({
        title: "Nombre del nuevo proceso",
        input: "text",
        inputPlaceholder: "Ejemplo: Proyecto Julio 2025",
        showCancelButton: true,
        confirmButtonText: "Crear proceso",
        cancelButtonText: "Cancelar",
        inputValidator: (value) => {
          if (!value.trim()) {
            return "El nombre no puede estar vacío";
          }
          return null;
        },
      });

      if (!processName) {
        // Canceló o no puso nombre, no crear proceso
        return;
      }

      const processId = generateId();

      addProcess(processId, processName.trim(), customer, []);
      setCustomerForm(customer);
      setSelectedProcess(processId); 

      showAlert({
        title: "Cliente guardado",
        text: `Proceso "${processName.trim()}" registrado con ID: ${processId}`,
        icon: "success",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {CUSTOMER_FORM_FIELDS.map((field) => (
        <SmartInput
          key={field.id}
          id={field.id}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          value={customer[field.id]}
          onChange={(e) => handleChange(e, setCustomer)}
          className="mb-3"
          rows={field.rows}
        />
      ))}

      <button type="submit" className="btn btn-success">
        {selectedProcessId ? "Actualizar" : "Crear proceso"}
      </button>

      {/* <button
        type="button"
        className="btn btn-secondary ms-2"
        onClick={() => console.log(useProcessStore.getState().processes)}
      >
        Ver Procesos
      </button> */}
    </form>
  );
};

export default Customer;
