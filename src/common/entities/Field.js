

export default class Field {
  constructor({ PK, SK, fieldId, location, locationGM, photoURL }) {
    this.PK = PK;
    this.SK = SK;
    this.fieldId = fieldId;
    this.location = location;
    this.locationGM = locationGM;
    this.photoURL = photoURL;
  }

  static fromItem(item) {
    return new Field({
      PK: item.PK,
      SK: item.SK,
      fieldId: item.fieldId,
      location: item.location,
      locationGM: item.locationGM,
      photoURL: item.photoURL
    })
  }
}