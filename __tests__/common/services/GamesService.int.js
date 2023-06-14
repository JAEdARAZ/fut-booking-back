import GamesService from "../../../src/common/services/GamesService";

describe("Games service", () => {
  it("Get current week games", async () => {
    const service = new GamesService();
    const getResults = await service.getWeekGames("24/2023", "2023-06-13T00:00:00");
    expect(Array.isArray(getResults)).toBeTruthy();
  })

  it("Get week games with date limit", async () => {
    const service = new GamesService();
    const getResults = await service.getWeekGamesWithDayLimit("25/2023", "2023-06-21T23:59:59");
    expect(Array.isArray(getResults)).toBeTruthy();
  })
})