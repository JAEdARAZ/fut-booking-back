import axios from "axios";
import { config } from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

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
  testMatch: ['**/*.inte.js'],
  testTimeout: 60000 * 2 //2 minutes
}

export const apiAxios = axios.create({
  baseURL: `https://${process.env.httpApiGatewayEndpointId}.execute-api.${process.env.region}.amazonaws.com`,
  headers: {
    Authorization: `Bearer ${process.env.cognitoUserIdToken}`
  }
})