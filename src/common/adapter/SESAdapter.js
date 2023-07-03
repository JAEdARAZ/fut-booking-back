import { SESClient, SendEmailCommand, SendTemplatedEmailCommand } from "@aws-sdk/client-ses";

export const TEMPLATES = {
  playerJoinedGame: "first_template"
}
const CHARSET_UTF8 = "UTF-8";

export default class SESAdapter {
  constructor() {
    this.sesClient = new SESClient({
      region: process.env.region
    });
  }

  async sendEmail(emailTo, subject, body) {
    const command = new SendEmailCommand({
      Source: "mysuperemailsource@nomail.com",
      Destination: {
        ToAddresses: [emailTo]
      },
      Message: {
        Subject: {
          Charset: CHARSET_UTF8,
          Data: subject
        },
        Body: {
          Html: {
            Charset: CHARSET_UTF8,
            Data: body
          }
        }
      }
    });

    await this.sesSendCommand(command);
  }

  async sendTemplatedEmail(template, emailTo) {
    const command = new SendTemplatedEmailCommand({
      Source: "mysuperemailsource@nomail.com",
      Destination: {
        ToAddresses: [emailTo]
      },
      Template: template,
      TemplateData: JSON.stringify({
        test: "test"
      })
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