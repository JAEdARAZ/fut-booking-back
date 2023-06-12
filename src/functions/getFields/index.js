import { middify } from "../../common/middy/handlers.js";
import FieldsService from "../../common/services/FieldsService.js";

const lambdaHandler = async () => {
  const fieldsService = new FieldsService();
  return fieldsService.getFields();
}

export const handler = middify(lambdaHandler);