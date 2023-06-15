import AppError, { ErrorTypes } from "./AppError.js";

const joiMiddleware = (schema) => {
  const customMiddlewareBefore = async (request) => {
    const { event } = request;
    const { error } = schema.validate(event.body);
    if (error) {
      const context = error.details[0].context;
      throw new AppError({
        statusCode: ErrorTypes.BAD_REQUEST.statusCode,
        message: `Invalid parameter '${context.key}': '${context.value}'`
      });
    }
  }

  return {
    before: customMiddlewareBefore
  }
}

export default joiMiddleware;