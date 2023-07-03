const path = require("path");
const mjml2html = require("mjml");
const htmlToText = require("html-to-text");

const templatesList = [
  {
    templateId: "player-joined-game-template",
    templateSubject: "[FUT BOOKING] Joined the game successfully!"
  }
];

module.exports = async (serverless, options) => {
  const sesEmailTemplates = templatesList.map(templateInfo => {
    const { templateId, templateSubject } = templateInfo;
    const templatePath = path.join(__dirname, `templates/${templateId}.mjml`);
    const templateHtml = getHtmlTemplate(serverless, templatePath);
    const templateText = htmlToText.convert(templateHtml, { wordwrap: 130 });

    return {
      name: templateId,
      subject: templateSubject,
      html: templateHtml,
      text: templateText,
    };
  });

  return sesEmailTemplates;
}

function getHtmlTemplate(serverless, templatePath) {
  const mjmlTemplate = serverless.utils.readFileSync(templatePath);
  const { html } = mjml2html(mjmlTemplate);
  return html;
}
