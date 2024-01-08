import { useTotal } from "@/store";
export const setTotal = (total: string) => {
  useTotal().setTotal(Number(total));
};
