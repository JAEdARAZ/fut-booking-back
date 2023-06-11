import Joi from "joi";

const schema =
  Joi.object({
    location: Joi.string().required(),
    locationGM: Joi.string().required(),
    photoURL: Joi.string().required()
  })

export default schema;