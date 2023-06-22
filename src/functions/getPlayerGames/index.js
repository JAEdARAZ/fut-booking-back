import { middify } from "../../common/middy/handlers.js";
import GamesService from "../../common/services/GamesService.js";
import schema from "./schema.js";

const lambdaHandler = async (event) => {
  const playerId = event.pathParameters.playerId;
  const gamesService = new GamesService();
  const playerGames = await gamesService.getPlayerGames(playerId);

  return simplifyResponse(playerGames);
}

export function simplifyResponse(playerGames) {
  const simplifiedPlayerGames = [];
  playerGames.forEach(pg => {
    let simplifiedPG = pg.getSimplifiedObject();
    delete simplifiedPG.player;
    simplifiedPlayerGames.push(simplifiedPG);
  })

  return simplifiedPlayerGames;
}

export const handler = middify(lambdaHandler, schema);