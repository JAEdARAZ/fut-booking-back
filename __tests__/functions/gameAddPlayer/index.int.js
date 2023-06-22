import axios from "axios";
import { ErrorTypes } from "../../../src/common/middy/AppError";
import DynamoAdapter from "../../../src/common/adapter/DynamoAdapter";
import { GAME_ID } from "../../../src/common/entities/Game";
import { PLAYER_ID } from "../../../src/common/entities/Player";
axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("addPlayer lambda", () => {
  let createdGameId;
  let addedPlayerId;

  beforeAll(async () => {
    const payload = {
      gameDate: "2023-06-16",
      gameTime: "18:00",
      playersTotal: 16,
      fieldId: "F1"
    }

    const createResult = await axios.post("/games", payload);
    createdGameId = createResult.data.id;
  })

  it("Add player, responds 200 OK", async () => {
    const payload = {
      playerId: "XYZ"
    }

    const actual = await axios.post(`/games/${createdGameId}/players`, payload);
    createdGameId = actual.data.gameId;
    addedPlayerId = actual.data.playerId;

    expect(actual.data.gameId).toBe(createdGameId);
    expect(actual.data.playerId).toBe(payload.playerId);
    expect(actual.status).toBe(201);
  })

  it("Invalid path parameter", async () => {
    const gameId = "123";
    const payload = {
      playerId: "XYZ"
    }

    let invalidCreateResult;
    try {
      await axios.post(`/games/${gameId}/players`, payload);
    } catch (error) {
      invalidCreateResult = error.response.data;
    }

    expect(invalidCreateResult.statusCode).toBe(ErrorTypes.BAD_REQUEST.statusCode);
  })

  afterAll(async () => {
    await axios.delete(`/games/${createdGameId}`);
    const db = new DynamoAdapter();
    await db.deleteItem(process.env.futBookingTableName, GAME_ID + createdGameId, PLAYER_ID + addedPlayerId);
  })
})