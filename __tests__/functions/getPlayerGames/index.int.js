import axios from "axios";
import DynamoAdapter from "../../../src/common/adapter/DynamoAdapter";
import { GAME_ID } from "../../../src/common/entities/Game";
import { PLAYER_ID } from "../../../src/common/entities/Player";
axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("getPlayerGames lambda", () => {
  let createdGameId;
  let addedPlayerId;

  beforeAll(async () => {
    const createResult = await axios.post("/games", {
      gameDate: "2023-06-20",
      gameTime: "22:00",
      playersTotal: 16,
      fieldId: "F1"
    });
    createdGameId = createResult.data.id;

    const addPlayerResult = await axios.post(`/games/${createdGameId}/players`, {
      playerId: "XYZ"
    });
    addedPlayerId = addPlayerResult.data.playerId;
  })

  it("Get player games, responds 200 OK", async () => {
    const queryResult = await axios.get(`/players/${addedPlayerId}/games`);

    expect(queryResult.status).toBe(200);
    expect(queryResult.data.length).toBeGreaterThan(0);
    expect(queryResult.data[0].playerId).toBe(addedPlayerId);
  })

  afterAll(async () => {
    await axios.delete(`/games/${createdGameId}`);
    const db = new DynamoAdapter();
    await db.deleteItem(process.env.futBookingTableName, GAME_ID + createdGameId, PLAYER_ID + addedPlayerId);
  })
})