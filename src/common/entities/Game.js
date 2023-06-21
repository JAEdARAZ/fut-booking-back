import DynamoEntity from "./DynamoEntity.js";
import { FieldNested } from "./Field.js";

export const GAME_ID = "G#";

export default class Game extends DynamoEntity {
  constructor({ PK, SK, id, field, gameWeek, gameDateTime, playersTotal }) {
    super();
    const gameId = this.generateId();
    this.PK = PK || GAME_ID + gameId;
    this.SK = SK || GAME_ID + gameId;
    this.id = id || gameId;
    this.field = new FieldNested(field);
    this.gameWeek = gameWeek;
    this.gameDateTime = gameDateTime;
    this.playersTotal = playersTotal;
  }

  setPlayers(players) {
    this.players = players;
    this.playersJoined = players.length;
  }

  getSimplifiedObject() {
    const simplifiedGame = {
      id: this.id,
      field: this.field.getSimplifiedObject(),
      gameWeek: this.gameWeek,
      gameDateTime: this.gameDateTime,
      playersTotal: this.playersTotal
    };

    if (this.players) {
      simplifiedGame.players = this.players.map(p => p.getSimplifiedObject());
      simplifiedGame.playersJoined = this.playersJoined;
    }

    return simplifiedGame;
  }
}