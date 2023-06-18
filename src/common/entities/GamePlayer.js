import DynamoEntity from "./DynamoEntity.js";
import { GAME_ID } from "./Game.js";
import { PLAYER_ID } from "./Player.js";

export default class GamePlayer extends DynamoEntity {
  constructor({ PK, SK, gameDateTime }) {

    super();
    this.PK = PK.startsWith(GAME_ID) ? PK : GAME_ID + PK;
    this.SK = SK.startsWith(PLAYER_ID) ? SK : PLAYER_ID + SK;
    this.gameDateTime = gameDateTime;
  }

  getSimplifiedObject() {
    return {
      gameId: this.PK.substring(GAME_ID.length),
      playerId: this.SK.substring(PLAYER_ID.length),
      gameDateTime: this.gameDateTime
    }
  }
}