import DynamoAdapter from "../../../src/common/adapter/DynamoAdapter.js";
import { PLAYER_ID } from "../../../src/common/entities/Player.js";
import GamesService from "../../../src/common/services/GamesService.js";
import { handler } from "../../../src/functions/createPlayer/index.js";

describe("createPlayer lambda", () => {
  it("Create new player", async () => {
    const cognitoUserId = "COGNITO_USERNAME_ID";
    const event = {
      version: "1",
      region: "us-east-1",
      userPoolId: "us-east-1_USERPOOLID",
      userName: cognitoUserId,
      callerContext: {
        awsSdkVersion: "aws-sdk-unknown-unknown",
        clientId: "CLIENTID"
      },
      triggerSource: "PostConfirmation_ConfirmSignUp",
      request: {
        userAttributes: {
          sub: cognitoUserId,
          email_verified: "true",
          birthdate: "10/10/2010",
          "cognito:user_status": "CONFIRMED",
          "cognito:email_alias": "test@mail.com",
          gender: "M",
          name: "Jhon Doe",
          email: "test@mail.com"
        }
      },
      response: {}
    }

    await handler(event);
    const gamesService = new GamesService();
    const dynamoAdapter = new DynamoAdapter();
    const getResult = await gamesService.getPlayer(cognitoUserId);

    expect(getResult.id).toBe(event.request.userAttributes.sub);
    expect(getResult.name).toBe(event.request.userAttributes.name)
    expect(getResult.email).toBe(event.request.userAttributes.email);
    await expect(dynamoAdapter.deleteItem(process.env.futBookingTableName, PLAYER_ID + cognitoUserId, PLAYER_ID + cognitoUserId)).resolves.not.toThrow();
  })
})