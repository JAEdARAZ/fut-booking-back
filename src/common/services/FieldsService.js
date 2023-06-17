import DynamoAdapter from "../adapter/DynamoAdapter.js";
import Field, { FIELD_PK } from "../entities/Field.js";

export default class FieldsService {
  constructor() {
    this.dynamoAdapter = new DynamoAdapter();
    this.tableName = process.env.futBookingTableName;
  }

  async create(field) {
    field = new Field(field);
    await this.dynamoAdapter.createItem(this.tableName, field.toItem());
    return field;
  }

  async getField(fieldId) {
    const response = await this.dynamoAdapter.getByKey(this.tableName, FIELD_PK, `F#${fieldId}`);
    const item = response.Item;
    return item ? new Field(item) : item;
  }

  async getFields() {
    const response = await this.dynamoAdapter.queryByKey(this.tableName, FIELD_PK);
    const items = response.Items;
    return items.map(item => new Field(item));
  }

  async deleteField(fieldId) {
    await this.dynamoAdapter.deleteItem(this.tableName, FIELD_PK, `F#${fieldId}`);
  }
}