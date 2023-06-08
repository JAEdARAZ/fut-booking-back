import DynamoAdapter from "../adapter/DynamoAdapter.js";

export default class GamesService {
  constructor() {
    this.dynamoAdapter = new DynamoAdapter();
    this.tableName = process.env.futBookingTableName;
  }

  async createGame() {
    
  }
}