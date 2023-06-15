
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
  BAD_REQUEST: { message: "Bad request", statusCode: 400 },
  GAME_ALREADY_EXISTS: { message: "A game for that field and date already exists", statusCode: 400 }
})