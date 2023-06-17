import FieldsService from "../../common/services/FieldsService.js"
import { middify } from "../../common/middy/handlers.js"
import schema from "./schema.js";

const lambdaHandler = async (event) => {
  const field = event.body;
  const fieldsService = new FieldsService();
  const createdField = await fieldsService.create(field);
  return createdField.getSimplifiedObject();
}

export const handler = middify(lambdaHandler, schema);