import { apiAxios } from "../../../config/integration.jest.config.js";

describe("getGames lambda", () => {
  it("Get games, responds 200 OK", async () => {
    const actual = await apiAxios.get("/games");
    expect(actual.status).toBe(200);
  })
})
