import { useCustomerStore } from "@stores/customerStore.jsx";
import { useProcessStore } from "@stores/processStore.jsx";
import { useServiceStore } from "@stores/servicesStore.jsx";

export const useProcessManager = () => {
  const { setCustomerForm } = useCustomerStore();
  const processes = useProcessStore((state) => state.processes);
  const setSelectedProcess = useProcessStore(
    (state) => state.setSelectedProcess
  );

  const setServices = useServiceStore((state) => state.setServices);

  const loadProcess = (processId) => {
    console.log("🔄 Starting :: loadProcess");
    console.log("Cargando proceso con ID:", processId);

    const process = processes.find((p) => p.id === processId);
    if (!process) {
      console.warn("⚠️ Proceso no encontrado:", processId);
      return;
    }

    // Guardar ID seleccionado
    setSelectedProcess(processId);

    // Cargar datos del cliente
    setCustomerForm(process.customer);

    // Reemplazar toda la lista de servicios
    setServices(process.services || []);

    console.log("✅ Proceso cargado correctamente:", process);
  };

  return {
    processes,
    loadProcess,
  };
};
