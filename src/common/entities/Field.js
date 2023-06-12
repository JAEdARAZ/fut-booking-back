import { randomBytes } from "crypto";
export const FIELD_PK = "F#FIELD";

export default class Field {
  constructor({ fieldId, location, locationGM, photoURL }) {
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

  generateId() {
    return randomBytes(16).toString('hex');
  }

  toItem() {
    return { ...this };
  }
}