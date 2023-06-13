
export const getCurrentWeekNumber = () => {
  const currentDate = new Date();
  console.log(currentDate);
  const currentYear = currentDate.getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  console.log(startDate);
  const numberOfDays = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  console.log(numberOfDays);
  const currentWeek = Math.ceil((startDate.getDay() + 1 + numberOfDays) / 7);
  console.log(currentWeek);

  return `${currentWeek}/${currentYear}`;
}

export const getStartOfCurrentDateString = () => {
  const dateLength = "yyyy-mm-dd".length;
  const currentDate = new Date().toLocaleString("sv-SE", { timeZone: "Europe/Oslo" }).substring(0, dateLength);
  return `${currentDate}T00:00:00`;
}