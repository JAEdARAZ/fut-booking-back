import DynamoEntity from "./DynamoEntity.js";

export const FIELD_PK = "F#FIELD";

export default class Field extends DynamoEntity {
  constructor({ PK, SK, id, location, locationGM, photoURL }) {
    super();
    const fieldId = this.generateId();
    this.PK = PK || FIELD_PK;
    this.SK = SK || `F#${fieldId}`;
    this.id = id || fieldId;
    this.location = location;
    this.locationGM = locationGM;
    this.photoURL = photoURL;
  }

  getSimplifiedObject() {
    return {
      id: this.id,
      location: this.location,
      locationGM: this.locationGM,
      photoURL: this.photoURL
    }
  }
}