import { randomBytes } from "crypto";
export const FIELD_PK = "F#FIELD";

export default class Field {
  constructor({ location, locationGM, photoURL }) {
    const id = this.generateId();
    this.PK = FIELD_PK;
    this.SK = `F#${id}`;
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