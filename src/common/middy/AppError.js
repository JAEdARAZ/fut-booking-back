
export default class AppError extends Error {
  constructor(errorType) {
    const errorResponseBody = {
      statusCode: errorType.statusCode,
      message: errorType.message.replace(/"/g, "'")
    }

    super(JSON.stringify(errorResponseBody));
    this.statusCode = errorType.statusCode;
  }
}

export const ErrorTypes = Object.freeze({
  BAD_REQUEST: { message: "Bad request mate", statusCode: 400 }
})