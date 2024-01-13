import { toPhDate } from "./phdate";
export const toPhMmYy = () => {
  const today = toPhDate();
  const yy = new Date(today).getFullYear();
  const mm = new Date(today).getMonth();
  const mmyy = String(mm) + String(yy);
  return mmyy;
};
