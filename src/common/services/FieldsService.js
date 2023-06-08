import DynamoAdapter from "../adapter/DynamoAdapter.js";
import Field from "../entities/Field.js";
const FIELD_PK = "F#FIELD";

export default class FieldsService {
  constructor() {
    this.dynamoAdapter = new DynamoAdapter();
    this.tableName = process.env.futBookingTableName;
  }

  async getField(fieldId) {
    const response = await this.dynamoAdapter.getByKey(this.tableName, FIELD_PK, `F#${fieldId}`);
    const item = response.Item;
    return item ? Field.fromItem(item) : item;
  }

  async getFields() {
    const response = await this.dynamoAdapter.queryByKey(this.tableName, FIELD_PK);
    const items = response.Items;
    return items.map(item => Field.fromItem(item));
  }
}