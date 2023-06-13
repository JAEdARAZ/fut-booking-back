import DynamoAdapter, { INDEXES } from "../adapter/DynamoAdapter.js";
import Game from "../../common/entities/Game.js";

export default class GamesService {
  constructor() {
    this.dynamoAdapter = new DynamoAdapter();
    this.tableName = process.env.futBookingTableName;
  }

  async getWeekGames(weekNumber, currentDate) {
    const response = await this.dynamoAdapter.queryIndexByKey(this.tableName, INDEXES.gameWeekGameDateTime, weekNumber, currentDate, ">=");
    const items = response.Items;
    return items.map(item => Game.fromItem(item));
  }
}