import DynamoEntity from "./DynamoEntity";

export const FIELD_PK = "F#FIELD";

export default class Field extends DynamoEntity {
  constructor({ fieldId, location, locationGM, photoURL }) {
    super();
    const id = fieldId || this.generateId();
    if (!fieldId) {
      this.PK = FIELD_PK;
      this.SK = `F#${id}`;
    }

    this.fieldId = id;
    this.location = location;
    this.locationGM = locationGM;
    this.photoURL = photoURL;
  }

  static fromItem(item) {
    return new Field({
      fieldId: item.fieldId,
      location: item.location,
      locationGM: item.locationGM,
      photoURL: item.photoURL
    })
  }
}