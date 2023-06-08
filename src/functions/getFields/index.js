import FieldsService from "../../common/services/FieldsService.js"

export const handler = async () => {
  const fieldsService = new FieldsService();
  return fieldsService.getFields();
}