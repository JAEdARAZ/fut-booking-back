import axios from "axios";
import { ErrorTypes } from "../../../src/common/middy/AppError.js";
axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("createGame lambda", () => {
  it("Create new game, responds 200 OK", async () => {
    const payload = {
      gameDate: "2023-06-16",
      gameTime: "17:00",
      fieldId: "F1"
    }

    const actual = await axios.post("/games", payload);
    expect(actual.status).toBe(201);
  })

  it("Create new game invalid, already exists", async () => {
    const payload = {
      gameDate: "2023-06-16",
      gameTime: "18:00",
      fieldId: "F1"
    }

    const createResult = await axios.post("/games", payload);

    let duplicateCreateResult;
    try {
      await axios.post("/games", payload);
    } catch (error) {
      duplicateCreateResult = error.response.data;
    }

    expect(createResult.status).toBe(201);
    expect(duplicateCreateResult.statusCode).toBe(ErrorTypes.GAME_ALREADY_EXISTS.statusCode);
    expect(duplicateCreateResult.message).toBe(ErrorTypes.GAME_ALREADY_EXISTS.message);
  })

  it("Invalid input", async () => {
    const payload = {
      gameDate: "2023-40-16", //wrong month
      gameTime: "17:00",
      fieldId: "F1"
    }

    let actual;
    try {
      await axios.post("/games", payload);
    } catch (error) {
      actual = error.response.data;
    }

    expect(actual.statusCode).toBe(ErrorTypes.BAD_REQUEST.statusCode);
  })
})
