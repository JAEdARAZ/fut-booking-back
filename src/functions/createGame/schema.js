import Joi from "joi";

const schema =
  Joi.object({
    gameDate: Joi.string().required(),
    gameTime: Joi.string().required(),
    fieldId: Joi.string().required()
  })

export default schema;