
import GamePlayer from "../../common/entities/GamePlayer.js";
import EmailService from "../../common/services/EmailService.js";

export const handler = async (event) => {
  const streamRecord = event.Records[0];
  const playerGame = GamePlayer.createFromMarshalled(streamRecord.dynamodb.NewImage);
  const playerEmail = playerGame.player.email;

  const sesService = new EmailService();
  await sesService.sendPlayerJoinedEmail(playerEmail, playerGame.gameDateTime, playerGame.field.location, playerGame.field.locationGM);
}