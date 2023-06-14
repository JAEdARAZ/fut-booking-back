
export const getCurrentWeekNumber = () => {
  //remove timezone
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  let currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  currentDate = new Date(Date.UTC(currentYear, currentDate.getMonth(), currentDate.getDate()));
  currentDate.setUTCDate(currentDate.getUTCDate() + 4 - (currentDate.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(currentYear, 0, 1));
  const weekNumber = Math.ceil((((currentDate - yearStart) / 86400000) + 1) / 7);

  return `${weekNumber}/${currentYear}`;
}

export const getStartOfCurrentDateString = () => {
  const dateLength = "yyyy-mm-dd".length;
  const currentDate = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Oslo" }).substring(0, dateLength);
  return `${currentDate}T00:00:00`;
}