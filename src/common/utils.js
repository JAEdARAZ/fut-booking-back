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

export const getFormattedDate = (dateTime) => {
  const gameDate = dateTime.split("T")[0];
  const gameDateArr = gameDate.split("-");
  return `${gameDateArr[2]}/${gameDateArr[1]}/${gameDateArr[0]}`;
}

export const getTimeWithoutSeconds = (dateTime) => {
  const gameTime = dateTime.split("T")[1];
  return gameTime.substring(0, "HH:MM".length);
}