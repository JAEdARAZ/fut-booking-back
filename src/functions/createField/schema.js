import Joi from "joi";

const schema =
  Joi.object({
    body: Joi.object({
      location: Joi.string().required(),
      locationGM: Joi.string().required(),
      photoURL: Joi.string().required()
    }),
    pathParameters: Joi.object({})
  })

export default schema;