import { middify } from "../../common/middy/handlers.js";
import GamesService from "../../common/services/GamesService.js";
import { simplifyResponse } from "./businessLogic.js";
import schema from "./schema.js";

const lambdaHandler = async (event) => {
  const playerId = event.pathParameters.playerId;
  const gamesService = new GamesService();
  const playerGames = await gamesService.getPlayerGames(playerId);

  return simplifyResponse(playerGames);
}

export const handler = middify(lambdaHandler, schema);