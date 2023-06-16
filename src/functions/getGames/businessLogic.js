const DATE_LENGTH = "yyyy-mm-dd".length;

export const getStartOfDateString = (date) => {
  const currentDate = date.toLocaleString("sv-SE", { timeZone: "Europe/Oslo" }).substring(0, DATE_LENGTH);
  return `${currentDate}T00:00:00`;
}

export const getEndOfDateString = (date) => {
  const currentDate = date.toLocaleString("sv-SE", { timeZone: "Europe/Oslo" }).substring(0, DATE_LENGTH);
  return `${currentDate}T23:59:59`;
}

export const addDaysToDate = (date, days) => {
  const addedDaysDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  addedDaysDate.setDate(addedDaysDate.getDate() + days);
  return addedDaysDate;
}

export const isMonday = () => {
  const mondayIndex = 1;
  return new Date().getDay() == mondayIndex;
}