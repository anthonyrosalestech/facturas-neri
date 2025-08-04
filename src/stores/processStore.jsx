import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProcessStore = create(
  persist(
    (set) => ({
      processes: [],
      selectedProcessId: null,

      // setProcesses: (processes) => set({ processes }),

      // 🟢 Agregar un nuevo proceso
      // addProcess1: (processName, customer, services) =>
      //   set((state) => ({
      //     processes: [
      //       ...state.processes,
      //       {
      //         id: processName,
      //         customer,
      //         services,
      //       },
      //     ],
      //   })),

      // 🟢 Agregar todos los procesos
      addProcess: (id, name, customer, services) =>
        set((state) => ({
          processes: [...state.processes, { id, name, customer, services }],
        })),

      // 🟢 Eliminar proceso por ID
      removeProcess: (processId) =>
        set((state) => ({
          processes: state.processes.filter((p) => p.id !== processId),
        })),

      // 🟢 Editar proceso
      updateProcess: (processId, updatedData) =>
        set((state) => ({
          processes: state.processes.map((p) =>
            p.id === processId ? { ...p, ...updatedData } : p
          ),
        })),

      // 🟢 Resetear todos los procesos
      clearProcesses: () => set({ processes: [] }),

      // 🟢 Seleccionar un proceso
      setSelectedProcess: (id) => set({ selectedProcessId: id }),
    }),
    {
      name: "processes-storage", // se guarda en localStorage nombre del storage
    }
  )
);
