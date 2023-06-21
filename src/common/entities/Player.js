import DynamoEntity from "./DynamoEntity.js";

export const PLAYER_ID = "P#";

export default class Player extends DynamoEntity {
  constructor({ PK, SK, id, email, name, gender, birthdate }) {
    super();
    this.PK = PK || PLAYER_ID + id;
    this.SK = SK || PLAYER_ID + id;
    this.id = id;
    this.email = email;
    this.name = name;
    this.gender = gender;
    this.birthdate = birthdate;
  }
}

export class PlayerNested {
  constructor({ id, email, name, gender, birthdate }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.gender = gender;
    this.birthdate = birthdate;
  }

  getSimplifiedObject() {
    return {
      name: this.name
    }
  }
}