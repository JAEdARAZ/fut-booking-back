import Joi from "joi";
const validDate = /^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;
const validTime = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

const schema =
  Joi.object({
    body: Joi.object({
      gameDate: Joi.string().regex(validDate).required(),
      gameTime: Joi.string().regex(validTime).required(),
      playersTotal: Joi.number().required(),
      fieldId: Joi.string().required()
    }),
    pathParameters: Joi.object({})
  })

export default schema;