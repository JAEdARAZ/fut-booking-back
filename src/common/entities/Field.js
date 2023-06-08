

export default class Field {
  constructor({ PK, SK, fieldId, location, locationGM, photoURL }) {
    this.PK = PK;
    this.SK = SK;
    this.fieldId = fieldId;
    this.location = location;
    this.locationGM = locationGM;
    this.photoURL = photoURL;
  }
}