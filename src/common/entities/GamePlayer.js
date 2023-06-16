import DynamoEntity from "./DynamoEntity.js";

export default class GamePlayer extends DynamoEntity {
  constructor({ PK, SK, gameDateTime }) {
    super();
    this.PK = PK.startsWith("G#") ? PK : `G#${PK}`;
    this.SK = SK.startsWith("P#") ? SK : `P#${SK}`;
    this.gameDateTime = gameDateTime;
  }

  static fromItem(item) {
    return new GamePlayer(item);
  }

  getFrontResponsePlayer() {
    return {
      gameId: this.PK.substring("G#".length),
      playerId: this.SK.substring("P#".length),
      gameDateTime: this.gameDateTime
    }
  }
}