import Joi from "joi";
const validGameId = /^[a-z0-9]{32}$/;

const schema =
  Joi.object({
    body: Joi.object({}),
    pathParameters: Joi.object({
      gameId: Joi.string().regex(validGameId).required()
    })
  })

export default schema;