import { middify } from "../../common/middy/handlers.js";
import GamesService from "../../common/services/GamesService.js";
import schema from "./schema.js";

const lambdaHandler = async (event) => {
  const playerId = event.pathParameters.playerId;
  const gamesService = new GamesService();
  const playerGames = await gamesService.getPlayerGames(playerId);

  return playerGames.map(playerGame => playerGame.getSimplifiedObject());
}

export const handler = middify(lambdaHandler, schema);