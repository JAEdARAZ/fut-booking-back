import AppError, { ErrorTypes } from "../../../src/common/middy/AppError";
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

  it("Create and delete game", async () => {
    const service = new GamesService();
    const createResult = await service.create("24/2023", "2023-06-15T17:00:00", 16, "F1");

    expect(createResult).toBeTruthy();
    await expect(service.deleteGame(createResult.id)).resolves.not.toThrow();
  })

  it("Get games for day and field", async () => {
    const service = new GamesService();
    const createResult = await service.create("24/2023", "2023-06-15T09:00:00", 16, "F1");
    const getResults = await service.getGamesForDayAndField("24/2023", "2023-06-15T09:00:00", "F1");

    expect(createResult).toBeTruthy();
    expect(Array.isArray(getResults)).toBeTruthy();
    expect(getResults.length).toBe(1);
    await expect(service.deleteGame(createResult.id)).resolves.not.toThrow();
  })

  it("Add player to game and delete it", async () => {
    const service = new GamesService();
    const addPlayerResult = await service.addPlayerToGame("123", "XYZ");

    expect(addPlayerResult.PK).toBe("G#123");
    expect(addPlayerResult.SK).toBe("P#XYZ");
    await expect(service.deletePlayerFromGame("123", "XYZ")).resolves.not.toThrow();
  })

  it("Add player to game fails for non existing game", async () => {
    const service = new GamesService();

    try {
      await service.addPlayerToGame("111", "XYZ");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      const errorBody = JSON.parse(error.message);
      expect(errorBody).toHaveProperty("statusCode", ErrorTypes.GAME_NOT_FOUND.statusCode);
      expect(errorBody).toHaveProperty("message", ErrorTypes.GAME_NOT_FOUND.message);
    }
  })

  it("Add player to game fails for non existing player", async () => {
    const service = new GamesService();

    try {
      await service.addPlayerToGame("123", "AAA");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      const errorBody = JSON.parse(error.message);
      expect(errorBody).toHaveProperty("statusCode", ErrorTypes.PLAYER_NOT_FOUND.statusCode);
      expect(errorBody).toHaveProperty("message", ErrorTypes.PLAYER_NOT_FOUND.message);
    }
  })

  it("Get games with players", async () => {
    const service = new GamesService();
    await service.addPlayerToGame("123", "ABC");
    const queryResult = await service.getGameWithPlayers("123");

    expect(queryResult.id).toBe("123");
    expect(queryResult.players).toHaveLength(1);
    expect(queryResult.players[0].id).toBe("ABC");
    await expect(service.deletePlayerFromGame("123", "ABC")).resolves.not.toThrow();
  })

  it("Get player's games", async () => {
    const service = new GamesService();
    const createResult = await service.create("24/2023", "2023-06-15T22:00:00", 16, "F1");
    const createdGameId = createResult.id;
    await service.addPlayerToGame(createdGameId, "XYZ");

    const queryResult = await service.getPlayerGames("XYZ");
    expect(queryResult.length).toBeGreaterThan(0);
    expect(queryResult[0].getSimplifiedObject().gameId).toBe(createdGameId);
    expect(queryResult[0].getSimplifiedObject().playerId).toBe("XYZ");

    await expect(service.deletePlayerFromGame(createdGameId, "XYZ")).resolves.not.toThrow();
    await expect(service.deleteGame(createdGameId)).resolves.not.toThrow();
  })
})