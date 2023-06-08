import FieldsService from "../../common/services/FieldsService.js"

export const handler = async (event) => {
  const fieldId = event.pathParameters.fieldId;
  const fieldsService = new FieldsService();
  return fieldsService.getField(fieldId);
}