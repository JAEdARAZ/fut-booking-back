import GamesService from "../../../src/common/services/GamesService";

describe("Games service", () => {
  it("Get fields", async () => {
    const service = new GamesService();
    const getResults = await service.getWeekGames("24/2023", "2023-06-13T00:00:00");
    console.log(getResults);
    expect(Array.isArray(getResults)).toBeTruthy();
  })
})
