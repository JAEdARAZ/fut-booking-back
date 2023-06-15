import DynamoEntity from "./DynamoEntity.js";

export const FIELD_PK = "F#FIELD";

export default class Field extends DynamoEntity {
  constructor({ id, location, locationGM, photoURL }) {
    super();
    const fieldId = id || this.generateId();
    if (!id) {
      this.PK = FIELD_PK;
      this.SK = `F#${fieldId}`;
    }

    this.id = fieldId;
    this.location = location;
    this.locationGM = locationGM;
    this.photoURL = photoURL;
  }

  static fromItem(item) {
    return new Field({
      id: item.id,
      location: item.location,
      locationGM: item.locationGM,
      photoURL: item.photoURL
    })
  }
}