import FieldsService from "../../common/services/FieldsService.js"

export const handler = async (event) => {
  const field = event.body;
  const fieldsService = new FieldsService();
  return fieldsService.create(field);
}