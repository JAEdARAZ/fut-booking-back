import SESAdapter from "../adapter/SESAdapter.js";
import { getFormattedDate, getTimeWithoutSeconds } from "../../common/utils.js";

export default class EmailService {
  constructor() {
    this.sesAdapter = new SESAdapter();
  }

  async sendPlayerJoinedEmail(emailTo, gameDateTime, location, locationGM) {
    const subject = `[FUT BOOKING] Joined game to ${location.toUpperCase()}`;
    const body = this.buildPlayerJoinedBody(gameDateTime, location, locationGM);

    await this.sesAdapter.sendEmail(emailTo, subject, body);
  }

  buildPlayerJoinedBody(gameDateTime, location, locationGM) {
    const body = `
      <body>
        <h4><b>You have joined the game successfully!</b></h5></br>
        <h4>Information about the event:</h4>
        <ul>
          <li>Location: ${location}</li>
          <li>Date: ${getFormattedDate(gameDateTime)}</li>
          <li>Time: ${getTimeWithoutSeconds(gameDateTime)}</li>
          <li><a href="${locationGM}">${location.toUpperCase()} in Google Maps</a></li>
        </ul>
      </body>
    `
    return body;
  }
}