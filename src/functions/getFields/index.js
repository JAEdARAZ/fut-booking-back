import { middify } from "../../common/middy/handlers.js";
import FieldsService from "../../common/services/FieldsService.js";

const lambdaHandler = async () => {
  const fieldsService = new FieldsService();
  const fields = await fieldsService.getFields();

  let simplifiedFields = [];
  fields.forEach(field => {
    simplifiedFields.push(field.getSimplifiedObject());
  })

  return simplifiedFields;
}

export const handler = middify(lambdaHandler);