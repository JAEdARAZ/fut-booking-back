import { SESClient, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";

export const TEMPLATES = {
  playerJoinedGame: "player-joined-game-template"
}
const CHARSET_UTF8 = "UTF-8";

export default class SESAdapter {
  constructor() {
    this.sesClient = new SESClient({
      region: process.env.region
    });
  }

  async sendTemplatedEmail(template, emailTo, templateData) {
    const command = new SendTemplatedEmailCommand({
      Source: "mysuperemailsource@nomail.com",
      Destination: {
        ToAddresses: [emailTo]
      },
      Template: template,
      TemplateData: JSON.stringify(templateData)
    });

    await this.sesSendCommand(command);
  }

  async sesSendCommand(command) {
    try {
      await this.sesClient.send(command);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}