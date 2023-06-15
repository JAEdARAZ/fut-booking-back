import DynamoAdapter, { INDEXES } from "../adapter/DynamoAdapter.js";
import FieldsService from "../services/FieldsService.js";
import Game from "../../common/entities/Game.js";

export default class GamesService {
  constructor() {
    this.dynamoAdapter = new DynamoAdapter();
    this.fieldsService = new FieldsService();
    this.tableName = process.env.futBookingTableName;
  }

  async create(gameWeek, gameDateTime, fieldId) {
    const field = await this.fieldsService.getField(fieldId);
    const game = new Game({ gameWeek, gameDateTime, field });
    await this.dynamoAdapter.createItem(this.tableName, game.toItem());

    game.removePKSK();
    return game.toItem();
  }

  async getWeekGames(weekNumber, currentDate) {
    const response = await this.dynamoAdapter.queryIndexByKey(this.tableName, INDEXES.gameWeekGameDateTime, weekNumber, currentDate, ">=");
    const items = response.Items;
    return items.map(item => Game.fromItem(item));
  }

  async getWeekGamesWithDayLimit(weekNumber, limitDate) {
    const response = await this.dynamoAdapter.queryIndexByKey(this.tableName, INDEXES.gameWeekGameDateTime, weekNumber, limitDate, "<=");
    const items = response.Items;
    return items.map(item => Game.fromItem(item));
  }

  async getGamesForDayAndField(weekNumber, gameDateTime, fieldId) {
    const response = await this.dynamoAdapter.queryIndexByKey(this.tableName, INDEXES.gameWeekGameDateTime, weekNumber, gameDateTime, "=");
    const items = response.Items;
    return items.map(item => Game.fromItem(item)).filter(game => game.field.id == fieldId);
  }
}