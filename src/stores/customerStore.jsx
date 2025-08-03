import { create } from "zustand";
// import { persist } from "zustand/middleware";

export const useCustomerStore = create((set) => ({
  customerForm: {
    customerName: "",
    customerEmail: "",
    customerTelephone: "",
    customerAddress: "",
    customerDescription: "",
  },
  setCustomerForm: (newCustomerForm) =>
    set(() => ({
      customerForm: newCustomerForm,
    })),
  setCustomerFormValue: (field, value) =>
    set((state) => ({
      customerForm: {
        ...state.customerForm,
        [field]: value,
      },
    })),
}));
