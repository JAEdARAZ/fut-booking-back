import Joi from "joi";
const validId = /^[a-z0-9]{32}$/;

const schema =
  Joi.object({
    pathParameters: Joi.object({
      playerId: Joi.string().required()
    }),
    body: Joi.object({})
  })

export default schema;