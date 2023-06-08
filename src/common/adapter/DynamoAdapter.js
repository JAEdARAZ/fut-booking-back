import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

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

  hello() {
    return "hello mate!";
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
}