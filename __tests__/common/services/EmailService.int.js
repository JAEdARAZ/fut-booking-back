import EmailService from "../../../src/common/services/EmailService"


describe("Email Service", () => {
  it("Send player joined game email", async () => {
    const service = new EmailService();
    const emailTo = process.env.sesFromEmail;
    const gameDateTime = "2023-06-06T15:00:00";
    const location = "Camp Nou";
    const locationGM = "https://goo.gl/maps/x8uChXfvtgSFseCj9";

    await expect(service.sendPlayerJoinedEmail(emailTo, gameDateTime, location, locationGM)).resolves.not.toThrow();
  })
})