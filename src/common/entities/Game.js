import DynamoEntity from "./DynamoEntity.js";

export default class Game extends DynamoEntity {
  constructor({ PK, SK, id, field, gameWeek, gameDateTime }) {
    super();
    const gameId = this.generateId();
    this.PK = PK || `G#${gameId}`;
    this.SK = SK || `G#${gameId}`;
    this.id = id || gameId;
    this.field = new GameField(field);
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

export class GameField {
  constructor({ id, location, locationGM, photoURL }) {
    this.id = id || id;
    this.location = location;
    this.locationGM = locationGM;
    this.photoURL = photoURL;
  }

  getSimplifiedObject() {
    return JSON.parse(JSON.stringify(this));
  }
}