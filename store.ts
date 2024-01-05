import { create } from "zustand";
import { persist } from "zustand/middleware";

type Total = {
  setTotal: (total: number) => void;
  total: number;
};

export const useTotal = create<Total>()((set) => ({
  total: 0,
  setTotal: (total) => set((state) => ({ total: total })),
}));
