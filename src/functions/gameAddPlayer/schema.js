import Joi from "joi";
const validId = /^[a-z0-9]{32}$/;

const schema =
  Joi.object({
    body: Joi.object({}),
    pathParameters: Joi.object({
      gameId: Joi.string().regex(validId).required()
    })
  })

export default schema;