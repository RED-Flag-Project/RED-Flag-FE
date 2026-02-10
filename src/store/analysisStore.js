import { create } from "zustand";

export const useAnalysisStore = create((set) => ({
  result: null,
  loading: false,

  start: () => set({ loading: true, result: null }),
  success: (result) => set({ loading: false, result }),
}));
