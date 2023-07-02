import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

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

    try {
      await this.sesClient.send(command);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}