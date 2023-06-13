import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

export const INDEXES = {
  gameWeekGameDateTime: {
    name: "gameWeek-gameDateTime-index",
    PK: "gameWeek",
    SK: "gameDateTime"
  }
}

const translateConfig = {
  marshallOptions: {
    convertEmptyValues: false,
    removeUndefinedValues: false,
    convertClassInstanceToMap: false,
  },
  unmarshallOptions: {
    wrapNumbers: false
  }
}

export default class DynamoAdapter {
  constructor() {
    this.dynamoClient = new DynamoDBClient({
      region: process.env.region
    });

    this.dynamoDocClient = DynamoDBDocument.from(this.dynamoClient, translateConfig);
  }

  async createItem(TableName, item) {
    const params = {
      TableName,
      Item: item,
      ReturnConsumedCapacity: "TOTAL"
    }

    return await this.create(params);
  }

  async deleteItem(TableName, PK, SK) {
    const params = {
      TableName,
      Key: { PK, SK },
      ReturnConsumedCapacity: "TOTAL"
    }

    return await this.delete(params);
  }

  async getByKey(TableName, PK, SK) {
    const params = {
      TableName,
      Key: { PK, SK },
      ReturnConsumedCapacity: "TOTAL"
    }

    return this.dynamoDocClient.get(params);
  }

  async queryByKey(TableName, PK, SK) {
    let keyConditionExpression = "PK = :PK";
    if (SK) {
      keyConditionExpression = `${keyConditionExpression} AND SK >= :SK`;
    }

    const params = {
      TableName,
      KeyConditionExpression: keyConditionExpression,
      ExpressionAttributeValues: {
        ":PK": PK,
        ... (SK && { ":SK": SK })
      },
      ReturnConsumedCapacity: "TOTAL"
    }

    return this.dynamoDocClient.query(params);
  }

  async queryIndexByKey(TableName, index, PK, SK, skCondition) {
    const params = {
      TableName,
      IndexName: index.name,
      KeyConditionExpression: `#PK = :PK AND #SK ${skCondition} :SK`,
      ExpressionAttributeNames: {
        "#PK": index.PK,
        "#SK": index.SK,
      },
      ExpressionAttributeValues: {
        ":PK": PK,
        ":SK": SK
      },
      ReturnConsumedCapacity: "TOTAL"
    }

    return this.dynamoDocClient.query(params);
  }

  async create(params) {
    return this.dynamoDocClient.put(params);
  }

  async delete(params) {
    return this.dynamoDocClient.delete(params);
  }
}