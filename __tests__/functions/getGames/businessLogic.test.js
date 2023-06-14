import { jest } from "@jest/globals";
import { getStartOfCurrentDateString, getCurrentWeekNumber } from "../../../src/functions/getGames/businessLogic.js";

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

  it("Gets correct start of date", () => {
    const mondayStart = `${monday.string}T00:00:00`;
    jest.useFakeTimers().setSystemTime(new Date(monday.year, monday.month, monday.day));
    const responseDate = getStartOfCurrentDateString();
    expect(responseDate).toBe(mondayStart);
  });

  it("Gets correct week number for monday", () => {
    jest.useFakeTimers().setSystemTime(new Date(monday.year, monday.month, monday.day));
    const weekNumber20230605 = "23/2023";
    const responseDate = getCurrentWeekNumber();
    expect(responseDate).toBe(weekNumber20230605);
  });

  it("Gets correct week number for sunday", () => {
    jest.useFakeTimers().setSystemTime(new Date(sunday.year, sunday.month, sunday.day));
    const weekNumber20230611 = "23/2023";
    const responseDate = getCurrentWeekNumber();
    expect(responseDate).toBe(weekNumber20230611);
  });
})