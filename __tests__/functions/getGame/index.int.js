import axios from "axios";
import DynamoAdapter from "../../../src/common/adapter/DynamoAdapter";
import { GAME_ID } from "../../../src/common/entities/Game";
import { PLAYER_ID } from "../../../src/common/entities/Player";
axios.defaults.baseURL = `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`;

describe("getGame lambda", () => {
  let createdGameId, addedPlayerId;

  beforeAll(async () => {
    const createResult = await axios.post("/games", {
      gameDate: "2023-07-15",
      gameTime: "10:00",
      playersTotal: 16,
      fieldId: "F1"
    });
    createdGameId = createResult.data.id;

    const addedPlayerResult = await axios.post(`/games/${createdGameId}/players`, {
      playerId: "XYZ"
    });
    addedPlayerId = addedPlayerResult.data.playerId;
  })

  it("Get games, responds 200 OK", async () => {
    const getGameResult = await axios.get(`/games/${createdGameId}`);

    expect(getGameResult.status).toBe(200);
    expect(getGameResult.data.id).toBe(createdGameId);
    expect(getGameResult.data.players).toHaveLength(1);
    expect(getGameResult.data.playersJoined).toBe(1);
    expect(getGameResult.data.players[0].name).toBeTruthy();
  })

  afterAll(async () => {
    await axios.delete(`/games/${createdGameId}`);
    const db = new DynamoAdapter();
    await db.deleteItem(process.env.futBookingTableName, GAME_ID + createdGameId, PLAYER_ID + addedPlayerId);
  })
})