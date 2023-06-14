import { jest } from "@jest/globals";
import { getStartOfDateString, getWeekNumber, isMonday, addDaysToDate, getEndOfDateString } from "../../../src/functions/getGames/businessLogic.js";

describe("Get games buiness logic", () => {
  //week 23 in 2023 [05/06/2023 - 11/06/2023]
  const monday = {
    year: 2023,
    month: 5,
    day: 5,
    string: "2023-06-05"
  };
  const sunday = {
    year: 2023,
    month: 5,
    day: 11,
    string: "2023-06-11"
  };

  const mondayDate = new Date(monday.year, monday.month, monday.day);
  const sundayDate = new Date(sunday.year, sunday.month, sunday.day);

  it("Gets correct start of date", () => {
    const mondayStart = `${monday.string}T00:00:00`;
    const responseDate = getStartOfDateString(mondayDate);
    expect(responseDate).toBe(mondayStart);
  });

  it("Gets correct end of date", () => {
    const mondayEnd = `${monday.string}T23:59:59`;
    const responseDate = getEndOfDateString(mondayDate);
    expect(responseDate).toBe(mondayEnd);
  });

  it("Current day is monday", () => {
    jest.useFakeTimers().setSystemTime(mondayDate);
    const actual = isMonday();
    expect(actual).toBe(true);
  });

  it("Get one week away date", () => {
    const oneWeekAwayString = "2023-06-12T00:00:00";
    jest.useFakeTimers().setSystemTime(mondayDate);
    const oneWeekAwayDate = addDaysToDate(mondayDate, 7);
    expect(getStartOfDateString(oneWeekAwayDate)).toBe(oneWeekAwayString);
  });

  it("Current day is not monday", () => {
    jest.useFakeTimers().setSystemTime(sundayDate);
    const actual = isMonday();
    expect(actual).toBe(false);
  });

  it("Gets correct week number for monday", () => {
    const weekNumber20230605 = "23/2023";
    const responseDate = getWeekNumber(mondayDate);
    expect(responseDate).toBe(weekNumber20230605);
  });

  it("Gets correct week number for sunday", () => {
    const weekNumber20230611 = "23/2023";
    const responseDate = getWeekNumber(sundayDate);
    expect(responseDate).toBe(weekNumber20230611);
  });
})