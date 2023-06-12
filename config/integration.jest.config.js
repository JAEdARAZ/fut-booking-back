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

export default {
  testEnvironment: "node",
  roots: ['../__tests__/'],
  testMatch: ['**/*.int.js'],
  testTimeout: 60000 * 2 //2 minutes
} 