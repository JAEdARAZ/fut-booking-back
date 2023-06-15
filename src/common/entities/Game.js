import DynamoEntity from "./DynamoEntity.js";
import Field from "./Field.js";

export default class Game extends DynamoEntity {
  constructor({ id, field, gameWeek, gameDateTime }) {
    super();
    const gameId = id || this.generateId();
    if (!id) {
      this.PK = `G#${gameId}`;
      this.SK = `G#${gameId}`;
    }

    this.id = gameId;
    this.field = new Field(field);
    this.gameWeek = gameWeek;
    this.gameDateTime = gameDateTime;
    this.playersTotal = 0;
  }

  removePKSK() {
    delete this.PK;
    delete this.SK;
  }

  static fromItem(item) {
    return new Game({
      id: item.id,
      field: Field.fromItem(item.field),
      gameWeek: item.gameWeek,
      gameDateTime: item.gameDateTime,
      playersTotal: item.playersTotal
    })
  }
}