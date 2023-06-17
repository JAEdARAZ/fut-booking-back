import DynamoEntity from "./DynamoEntity.js";
import Field from "./Field.js";

export default class Game extends DynamoEntity {
  constructor({ PK, SK, id, field, gameWeek, gameDateTime }) {
    super();
    const gameId = this.generateId();
    this.PK = PK || `G#${gameId}`;
    this.SK = SK || `G#${gameId}`;
    this.id = id || gameId;
    this.field = new Field(field);
    this.gameWeek = gameWeek;
    this.gameDateTime = gameDateTime;
    this.playersTotal = 0;
  }

  getSimplifiedObject() {
    return {
      id: this.id,
      field: this.field.getSimplifiedObject(),
      gameWeek: this.gameWeek,
      gameDateTime: this.gameDateTime,
      playersTotal: this.playersTotal
    }
  }
}