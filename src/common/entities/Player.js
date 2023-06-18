import DynamoEntity from "./DynamoEntity.js";

export const PLAYER_ID = "P#";

export default class Player extends DynamoEntity {
  constructor({ PK, SK, id }) {
    super();
    this.PK = PK || PLAYER_ID + id;
    this.SK = SK || PLAYER_ID + id;
    this.id = id;
  }

  getSimplifiedObject() {
    return { id: this.id };
  }
}