import { middify } from "../../common/middy/handlers.js"
import schema from "./schema.js";
import GamesService from "../../common/services/GamesService.js";

const handlerLambda = async (event) => {
  const gameId = event.pathParameters.gameId;
  const gamesService = new GamesService();
  const game = await gamesService.getGameWithPlayers(gameId);

  return game.getSimplifiedObject();
}

export const handler = middify(handlerLambda, schema);