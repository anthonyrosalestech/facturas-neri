import { create } from "zustand";
import { useProcessStore } from "./processStore"; // ajusta ruta si es necesario

export const useServiceStore = create((set, get) => ({
  form: {
    productName: "",
    productDescription: "",
    quantity: "",
    price: "",
    subTotal: "",
  },
  forms: [],
  editingIndex: null,

  setServices: (services) =>
    set({
      forms: services || [],
      form: {
        productName: "",
        productDescription: "",
        quantity: "",
        price: "",
        subTotal: "",
      },
      editingIndex: null,
    }),

  updateField: (field, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [field]: value,
      },
    })),

  resetForm: () =>
    set({
      form: {
        productName: "",
        productDescription: "",
        quantity: "",
        price: "",
        subTotal: "",
      },
      editingIndex: null,
    }),

  addFormToList: (values) => {
    set((state) => {
      let updatedForms;

      if (state.editingIndex !== null) {
        // Si está editando, actualizar el item existente
        updatedForms = [...state.forms];
        updatedForms[state.editingIndex] = values;
      } else {
        // Si no, agregar uno nuevo
        updatedForms = [...state.forms, values];
      }

      // Sincronizar con proceso
      const processStore = useProcessStore.getState();
      const selectedId = processStore.selectedProcessId;
      if (selectedId) {
        processStore.updateProcess(selectedId, { services: updatedForms });
      }

      return {
        forms: updatedForms,
        form: {
          productName: "",
          productDescription: "",
          quantity: "",
          price: "",
          subTotal: "",
        },
        editingIndex: null, // limpia estado edición
      };
    });
  },

  removeFormByIndex: (index) => {
    set((state) => {
      const updatedForms = state.forms.filter((_, i) => i !== index);

      // Sincronizar con proceso
      const processStore = useProcessStore.getState();
      const selectedId = processStore.selectedProcessId;
      if (selectedId) {
        processStore.updateProcess(selectedId, { services: updatedForms });
      }

      return {
        forms: updatedForms,
        // Si eliminas el elemento que estaba en edición, limpiar editingIndex
        editingIndex: state.editingIndex === index ? null : state.editingIndex,
      };
    });
  },

  editFormAtIndex: (index) =>
    set((state) => ({
      form: state.forms[index] || {
        productName: "",
        productDescription: "",
        quantity: "",
        price: "",
        subTotal: "",
      },
      editingIndex: index,
    })),

  updateFieldInForm: (index, field, value) => {
    set((state) => {
      const updated = [...state.forms];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      // Sincronizar con proceso
      const processStore = useProcessStore.getState();
      const selectedId = processStore.selectedProcessId;
      if (selectedId) {
        processStore.updateProcess(selectedId, { services: updated });
      }

      return { forms: updated };
    });
  },

  setEditingIndex: (index) => set({ editingIndex: index }),
  clearEditingIndex: () => set({ editingIndex: null }),
}));
