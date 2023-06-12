import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";
import joiMiddleware from "./joiMiddleware.js";

export const middify = (handler, schema) => {
  if (schema) {
    return middy(handler)
      .use(httpJsonBodyParser())
      .use(joiMiddleware(schema))
      .use(httpErrorHandler());
  } else {
    return middy(handler)
      .use(httpJsonBodyParser())
      .use(httpErrorHandler());
  }
}