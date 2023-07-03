module.exports = async (serverless, options) => {
  const template = {
    name: 'first_template',
    subject: 'First subject',
    html: '<h1>Hello world!</h1>',
    text: 'Hello world!',
  };

  return [template];
}