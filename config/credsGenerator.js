import crypto from "crypto";

const args = process.argv.slice(2);
const command = args[0];
const ACTIONS = {
  GENERATE_EMAIL: "GENERATE_EMAIL",
  GENERATE_PASS: "GENERATE_PASS"
}

function init() {
  switch (command) {
    case ACTIONS.GENERATE_EMAIL:
      console.log(generateEmail());
      break;
    case ACTIONS.GENERATE_PASS:
      console.log(generatePassword());
      break;
  }
}

init();

function generateEmail() {
  const length = 5;
  const wishlist = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const randomString = Array.from(crypto.getRandomValues(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join("");

  return `test-email-${randomString}@nomail.com`;
}

function generatePassword() {
  const length = 20;
  const wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';
  const validPasswordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@\-#$]).*$/);

  let password;
  do {
    password = Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join("");
  } while (!validPasswordRegex.test(password));

  return password;
}