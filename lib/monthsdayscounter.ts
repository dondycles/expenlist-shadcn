import { toPhDate } from "./phdate";

export const daysInEachMonth = (date?: Date) => {
  const year = new Date(toPhDate(date)).getDate();
  const month = new Date(toPhDate(date)).getMonth();
  const months = [
    { month: "Jan", days: 31 },
    {
      month: "Feb",
      days: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    },
    { month: "Mar", days: 31 },
    { month: "Apr", days: 30 },
    { month: "May", days: 31 },
    { month: "Jun", days: 30 },
    { month: "Jul", days: 31 },
    { month: "Aug", days: 31 },
    { month: "Sep", days: 30 },
    { month: "Oct", days: 31 },
    { month: "Nov", days: 30 },
    { month: "Dec", days: 31 },
  ];

  return months[month];
};
