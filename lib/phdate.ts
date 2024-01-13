const options = {
  timeZone: "Asia/Manila",
  hour12: false,
};

export const toPhDate = (value?: string | Date) => {
  if (value) return new Date(value).toLocaleDateString("en-US", options);

  return new Date().toLocaleDateString("en-US", options);
};
