import DynamoAdapter from "../../common/adapter/DynamoAdapter.js"

export const handler = async () => {
  const adapter = new DynamoAdapter();
  console.log(adapter.hello());

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
    })
  };
}