import { middify } from "../../common/middy/handlers.js"
import { getWeekNumber } from "../../common/utils.js"
import GamesService from "../../common/services/GamesService.js";
import schema from "./schema.js";
import { getGameDateTime } from "./businessLogic.js";
import AppError, { ErrorTypes } from "../../common/middy/AppError.js";

let gamesService;

const lambdaHandler = async (event) => {
  const game = event.body;
  gamesService = new GamesService();
  const gameWeekNumber = getWeekNumber(new Date(game.gameDate));
  const gameDateTime = getGameDateTime(game.gameDate, game.gameTime);

  await validateGameIsUnique(gameWeekNumber, gameDateTime, game.fieldId);
  const gameCreated = await gamesService.create(gameWeekNumber, gameDateTime, game.fieldId);
  return {
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: 201,
    body: JSON.stringify(gameCreated)
  }
}

async function validateGameIsUnique(gameWeekNumber, gameDateTime, fieldId) {
  const games = await gamesService.getGamesForDayAndField(gameWeekNumber, gameDateTime, fieldId);
  if (games.length != 0) {
    throw new AppError(ErrorTypes.GAME_ALREADY_EXISTS);
  }
}

export const handler = middify(lambdaHandler, schema);