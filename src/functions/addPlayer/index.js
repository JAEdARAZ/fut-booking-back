import { middify } from "../../common/middy/handlers.js";
import GamesService from "../../common/services/GamesService.js";
import schema from "./schema.js";

const lambdaHandler = async (event) => {
  const gameId = event.pathParameters.gameId;
  const playerId = event.body.playerId;
  const gamesService = new GamesService();
  const playerAdded = await gamesService.addPlayerToGame(gameId, playerId);

  return {
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: 201,
    body: JSON.stringify(playerAdded.getSimplifiedObject())
  }
}

export const handler = middify(lambdaHandler, schema);