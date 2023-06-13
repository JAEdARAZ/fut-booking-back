import { middify } from "../../common/middy/handlers.js";
import GamesService from "../../common/services/GamesService.js";
import { getCurrentWeekNumber, getStartOfCurrentDateString } from "./businessLogic.js";

const lambdaHandler = async () => {
  const service = new GamesService();
  const currentWeek = getCurrentWeekNumber();
  const startOfCurrentDate = getStartOfCurrentDateString();

  const games = await service.getWeekGames(currentWeek, startOfCurrentDate);
  return games;
}

export const handler = middify(lambdaHandler);