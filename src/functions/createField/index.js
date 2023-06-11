import FieldsService from "../../common/services/FieldsService.js"
import { middify } from "../../common/middy/handlers.js"
import schema from "./schema.js";

const lambdaHandler = async (event) => {
  console.log(event);
  const field = event.body;
  const fieldsService = new FieldsService();
  return fieldsService.create(field);
}

export const handler = middify(lambdaHandler, schema);