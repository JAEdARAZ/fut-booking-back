import { middify } from "../../common/middy/handlers.js";
import GamesService from "../../common/services/GamesService.js";
import { getWeekNumber } from "../../common/utils.js";
import { getStartOfDateString, isMonday, addDaysToDate, getEndOfDateString } from "./businessLogic.js";

const lambdaHandler = async () => {
  const service = new GamesService();
  const today = new Date();
  const currentWeek = getWeekNumber(today);
  let games = await service.getWeekGames(currentWeek, getStartOfDateString(today));

  if (!isMonday()) {
    const oneWeekAwayDate = addDaysToDate(today, 7);
    const nextWeek = getWeekNumber(oneWeekAwayDate);
    const limitDate = getEndOfDateString(oneWeekAwayDate);
    const nextWeekGames = await service.getWeekGamesWithDayLimit(nextWeek, limitDate);
    games = [...games, ...nextWeekGames];
  }

  return games;
}

export const handler = middify(lambdaHandler);