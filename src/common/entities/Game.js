import Field from "./Field";


export default class Game {
  constructor({ PK, SK, field, gameDateTime, gameWeek, playersTotal }) {
    this.PK = PK;
    this.SK = SK;
    this.field = new Field(field);
    this.gameDateTime = gameDateTime;
    this.gameWeek = gameWeek;
    this.playersTotal = playersTotal;
  }
}