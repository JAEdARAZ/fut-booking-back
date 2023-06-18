import DynamoAdapter, { INDEXES } from "../adapter/DynamoAdapter.js";
import FieldsService from "../services/FieldsService.js";
import Game from "../../common/entities/Game.js";
import AppError, { ErrorTypes } from "../middy/AppError.js";
import Player from "../entities/Player.js";
import GamePlayer from "../entities/GamePlayer.js";

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
    return game;
  }

  async getGame(gameId) {
    const response = await this.dynamoAdapter.getByKey(this.tableName, `G#${gameId}`, `G#${gameId}`);
    if (response.Item) {
      return new Game(response.Item);
    } else {
      throw new AppError(ErrorTypes.GAME_NOT_FOUND);
    }
  }

  async deleteGame(gameId) {
    await this.dynamoAdapter.deleteItem(this.tableName, `G#${gameId}`, `G#${gameId}`);
  }

  async getWeekGames(weekNumber, currentDate) {
    const response = await this.dynamoAdapter.queryIndexByKey(this.tableName, INDEXES.gameWeekGameDateTime, weekNumber, currentDate, ">=");
    const items = response.Items;
    return items.map(item => new Game(item));
  }

  async getWeekGamesWithDayLimit(weekNumber, limitDate) {
    const response = await this.dynamoAdapter.queryIndexByKey(this.tableName, INDEXES.gameWeekGameDateTime, weekNumber, limitDate, "<=");
    const items = response.Items;
    return items.map(item => new Game(item));
  }

  async getGamesForDayAndField(weekNumber, gameDateTime, fieldId) {
    const response = await this.dynamoAdapter.queryIndexByKey(this.tableName, INDEXES.gameWeekGameDateTime, weekNumber, gameDateTime, "=");
    const items = response.Items;
    return items.map(item => new Game(item)).filter(game => game.field.id == fieldId);
  }

  async getPlayer(playerId) {
    const response = await this.dynamoAdapter.getByKey(this.tableName, `P#${playerId}`, `P#${playerId}`);
    if (response.Item) {
      return new Player(response.Item);
    } else {
      throw new AppError(ErrorTypes.PLAYER_NOT_FOUND);
    }
  }

  async addPlayerToGame(gameId, playerId) {
    const game = await this.getGame(gameId);
    const player = await this.getPlayer(playerId);

    const playerToAdd = new GamePlayer({
      PK: game.id,
      SK: player.id,
      gameDateTime: game.gameDateTime
    })

    await this.dynamoAdapter.createItem(this.tableName, playerToAdd.toItem());
    return playerToAdd;
  }

  async deletePlayerFromGame(gameId, playerId) {
    await this.dynamoAdapter.deleteItem(this.tableName, `G#${gameId}`, `P#${playerId}`);
  }
}