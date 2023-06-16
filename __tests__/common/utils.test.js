import { getWeekNumber } from "../../src/common/utils.js";

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