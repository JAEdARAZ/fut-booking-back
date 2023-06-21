import Game, { GAME_ID } from "../../common/entities/Game.js";
import DynamoAdapter, { INDEXES } from "../adapter/DynamoAdapter.js";
import GamePlayer from "../entities/GamePlayer.js";
import Player, { PLAYER_ID, PlayerNested } from "../entities/Player.js";
import AppError, { ErrorTypes } from "../middy/AppError.js";
import FieldsService from "../services/FieldsService.js";

export default class GamesService {
  constructor() {
    this.dynamoAdapter = new DynamoAdapter();
    this.fieldsService = new FieldsService();
    this.tableName = process.env.futBookingTableName;
  }

  async create(gameWeek, gameDateTime, playersTotal, fieldId) {
    const field = await this.fieldsService.getField(fieldId);
    const game = new Game({ gameWeek, gameDateTime, playersTotal, field });
    await this.dynamoAdapter.createItem(this.tableName, game.toItem());
    return game;
  }

  async getGame(gameId) {
    const response = await this.dynamoAdapter.getByKey(this.tableName, GAME_ID + gameId, GAME_ID + gameId);
    if (response.Item) {
      return new Game(response.Item);
    } else {
      throw new AppError(ErrorTypes.GAME_NOT_FOUND);
    }
  }

  async getGameWithPlayers(gameId) {
    const response = await this.dynamoAdapter.queryByKey(this.tableName, GAME_ID + gameId);
    const items = response.Items;

    let game, players = [];
    items.forEach(i => {
      if (i.SK.startsWith(GAME_ID)) {
        game = new Game(i);
      } else {
        players.push(new PlayerNested(i.player));
      }
    })

    if (game) {
      game.setPlayers(players);
      return game;
    } else {
      throw new AppError(ErrorTypes.GAME_NOT_FOUND);
    }
  }

  async deleteGame(gameId) {
    await this.dynamoAdapter.deleteItem(this.tableName, GAME_ID + gameId, GAME_ID + gameId);
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

  async createPlayer(id, email, name, gender, birthdate) {
    const player = new Player({ id, email, name, gender, birthdate });
    await this.dynamoAdapter.createItem(this.tableName, player.toItem());
    return player;
  }

  async getPlayer(playerId) {
    const response = await this.dynamoAdapter.getByKey(this.tableName, PLAYER_ID + playerId, PLAYER_ID + playerId);
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
      gameDateTime: game.gameDateTime,
      field: game.field,
      player
    })

    await this.dynamoAdapter.createItem(this.tableName, playerToAdd.toItem());
    return playerToAdd;
  }

  async deletePlayerFromGame(gameId, playerId) {
    await this.dynamoAdapter.deleteItem(this.tableName, GAME_ID + gameId, PLAYER_ID + playerId);
  }

  async getPlayerGames(playerId) {
    const response = await this.dynamoAdapter.queryIndexByKey(this.tableName, INDEXES.SKGameDateTime, PLAYER_ID + playerId, " ", ">");
    const items = response.Items;
    return items.map(item => new GamePlayer(item));
  }
}