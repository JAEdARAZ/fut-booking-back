import { middify } from "../../common/middy/handlers.js"
import { getWeekNumber } from "../../common/utils.js"
import GamesService from "../../common/services/GamesService.js";
import schema from "./schema.js";
import { getGameDateTime } from "./businessLogic.js";

const lambdaHandler = async (event) => {
  const game = event.body;
  const gamesService = new GamesService();
  const gameWeekNumber = getWeekNumber(new Date(game.gameDate));
  const gameDateTime = getGameDateTime(game.gameDate, game.gameTime);
  return await gamesService.create(gameWeekNumber, gameDateTime, game.fieldId);
}

export const handler = middify(lambdaHandler, schema);