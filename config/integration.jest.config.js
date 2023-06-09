import { config } from "dotenv";
import { fileURLToPath } from "url";
import { resolve, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({
  path: resolve(__dirname, '../.awsenv'),
  bail: 1,
  testEnvironment: 'node'
})

const configuration = {
  testEnvironment: "node",
  roots: ['../__tests__/'],
  testMatch: ['**/*.(int|integration).js'],
  testTimeout: 60000 * 2 //2 minutes
}

export default configuration; 