import { middify } from "../../common/middy/handlers.js";
import FieldsService from "../../common/services/FieldsService.js";

const lambdaHandler = async () => {
  const fieldsService = new FieldsService();
  const fields = await fieldsService.getFields();

  return fields.map(field => field.getSimplifiedObject());
}

export const handler = middify(lambdaHandler);