import AppError, { ErrorTypes } from "./AppError.js";

const joiMiddleware = (schema) => {
  const customMiddlewareBefore = async (request) => {
    const { event } = request;
    const { error } = schema.validate(event.body);
    if (error) {
      throw new AppError(ErrorTypes.BAD_REQUEST);
    }
  }

  return {
    before: customMiddlewareBefore
  }
}

export default joiMiddleware;