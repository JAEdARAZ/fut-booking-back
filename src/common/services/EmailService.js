import SESAdapter, { TEMPLATES } from "../adapter/SESAdapter.js";
import { getFormattedDate, getTimeWithoutSeconds } from "../../common/utils.js";

export default class EmailService {
  constructor() {
    this.sesAdapter = new SESAdapter();
  }

  async sendPlayerJoinedEmail(emailTo, gameDateTime, location, locationGM) {
    const templateData = {
      location: location.toUpperCase(),
      gameDate: getFormattedDate(gameDateTime),
      gameTime: getTimeWithoutSeconds(gameDateTime)
    }

    await this.sesAdapter.sendTemplatedEmail(TEMPLATES.playerJoinedGame, emailTo, templateData);
  }
}