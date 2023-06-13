import { jest } from "@jest/globals";
import { getStartOfCurrentDateString, getCurrentWeekNumber } from "../../../src/functions/getGames/businessLogic.js";

describe("Get games buiness logic", () => {
  const monday = "2023-06-05"; //week 23 in 2023
  const sunday = "2023-06-11"; //week 23 in 2023

  it("Gets correct start of date", () => {
    const mondayStart = `${monday}T00:00:00`;
    jest.useFakeTimers().setSystemTime(new Date(monday));
    const responseDate = getStartOfCurrentDateString();
    expect(responseDate).toBe(mondayStart);
  });

  it("Gets correct week number for monday", () => {
    jest.useFakeTimers().setSystemTime(new Date(monday));
    const weekNumber20230605 = "23/2023";
    const responseDate = getCurrentWeekNumber();
    expect(responseDate).toBe(weekNumber20230605);
  });

  it("Gets correct week number for sunday", () => {
    jest.useFakeTimers().setSystemTime(new Date(sunday));
    const weekNumber20230611 = "23/2023";
    const responseDate = getCurrentWeekNumber();
    expect(responseDate).toBe(weekNumber20230611);
  });
})