import { apiAxios } from "../../../config/integration.jest.config.js";

describe("getFields lambda", () => {
  it("Get fields, responds 200 OK", async () => {
    const actual = await apiAxios.get("/fields");
    expect(actual.status).toBe(200);
  })
})
