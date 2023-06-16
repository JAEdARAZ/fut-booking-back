import { middify } from "../../common/middy/handlers.js";
import GamesService from "../../common/services/GamesService.js";
import schema from "./schema.js";

const lambdaHandler = async (event) => {
  const gameId = event.pathParameters.gameId;
  const gamesService = new GamesService();
  await gamesService.deleteGame(gameId);

  return {
    statusCode: 204
  }
}

export const handler = middify(lambdaHandler, schema);