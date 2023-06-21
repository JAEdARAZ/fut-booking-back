import DynamoEntity from "./DynamoEntity.js";
import { FieldNested } from "./Field.js";
import { GAME_ID } from "./Game.js";
import { PLAYER_ID, PlayerNested } from "./Player.js";

export default class GamePlayer extends DynamoEntity {
  constructor({ PK, SK, gameDateTime, field, player }) {
    super();
    this.PK = PK.startsWith(GAME_ID) ? PK : GAME_ID + PK;
    this.SK = SK.startsWith(PLAYER_ID) ? SK : PLAYER_ID + SK;
    this.gameDateTime = gameDateTime;
    this.field = new FieldNested(field);
    this.player = new PlayerNested(player);
  }

  getSimplifiedObject() {
    return {
      gameId: this.PK.substring(GAME_ID.length),
      playerId: this.SK.substring(PLAYER_ID.length),
      gameDateTime: this.gameDateTime,
      field: this.field.getSimplifiedObject(),
      player: this.player.getSimplifiedObject()
    }
  }
}