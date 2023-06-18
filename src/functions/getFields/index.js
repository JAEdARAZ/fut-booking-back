import { middify } from "../../common/middy/handlers.js";
import FieldsService from "../../common/services/FieldsService.js";
import { getSimplifiedObjects } from "../../common/utils.js";

const lambdaHandler = async () => {
  const fieldsService = new FieldsService();
  const fields = await fieldsService.getFields();

  return getSimplifiedObjects(fields);
}

export const handler = middify(lambdaHandler);