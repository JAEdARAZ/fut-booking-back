import DynamoEntity from "./DynamoEntity.js";

export default class Player extends DynamoEntity {
  constructor({ PK, SK, id }) {
    super();
    this.PK = PK || `P#${id}`;
    this.SK = SK || `P#${id}`;
    this.id = id;
  }
}