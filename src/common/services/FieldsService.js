import DynamoAdapter from "../adapter/DynamoAdapter.js";
import Field from "../entities/Field.js";


export default class FieldsService {
  constructor() {
    this.dynamoAdapter = new DynamoAdapter();
    this.tableName = process.env.futBookingTableName;
  }

  async getField(fieldId) {
    const response = await this.dynamoAdapter.queryByKey(this.tableName, "F#FIELD", `F#${fieldId}`);
    const item = response.Items[0];
    if (item) {
      return new Field({ 
        PK: item.PK, 
        SK: item.SK, 
        fieldId: item.fieldId, 
        location: item.location, 
        locationGM: item.locationGM, 
        photoURL: item.photoURL
      });
    }

    return item;
  }
}