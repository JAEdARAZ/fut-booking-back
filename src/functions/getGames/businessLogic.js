const DATE_LENGTH = "yyyy-mm-dd".length;

export const getWeekNumber = (date) => {
  //remove timezone
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  const currentYear = date.getFullYear();
  date = new Date(Date.UTC(currentYear, date.getMonth(), date.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(currentYear, 0, 1));
  const weekNumber = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);

  return `${weekNumber}/${currentYear}`;
}

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