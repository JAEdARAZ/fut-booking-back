import { apiAxios } from "../../../config/integration.jest.config.js";
import { ErrorTypes } from "../../../src/common/middy/AppError.js";

describe("createGame lambda", () => {
  it("Create new game, responds 200 OK", async () => {
    const payload = {
      gameDate: "2023-06-16",
      gameTime: "17:00",
      playersTotal: 14,
      fieldId: "F1"
    }

    const createResult = await apiAxios.post("/games", payload);
    const deleteResult = await apiAxios.delete(`/games/${createResult.data.id}`, payload);

    expect(createResult.status).toBe(201);
    expect(deleteResult.status).toBe(204);
  })

  it("Create new game invalid, already exists", async () => {
    const payload = {
      gameDate: "2023-06-28",
      gameTime: "18:00",
      playersTotal: 14,
      fieldId: "F1"
    }

    const createResult = await apiAxios.post("/games", payload);

    let duplicateCreateResult;
    try {
      await apiAxios.post("/games", payload);
    } catch (error) {
      duplicateCreateResult = error.response.data;
    }

    const deleteResult = await apiAxios.delete(`/games/${createResult.data.id}`, payload);

    expect(createResult.status).toBe(201);
    expect(duplicateCreateResult.statusCode).toBe(ErrorTypes.GAME_ALREADY_EXISTS.statusCode);
    expect(duplicateCreateResult.message).toBe(ErrorTypes.GAME_ALREADY_EXISTS.message);
    expect(deleteResult.status).toBe(204);
  })

  it("Invalid input", async () => {
    const payload = {
      gameDate: "2023-40-16", //wrong month
      gameTime: "17:00",
      fieldId: "F1"
    }

    let actual;
    try {
      await apiAxios.post("/games", payload);
    } catch (error) {
      actual = error.response.data;
    }

    expect(actual.statusCode).toBe(ErrorTypes.BAD_REQUEST.statusCode);
  })
})
