import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import joiMiddleware from "./joiMiddleware.js";

export const middify = (handler, schema) => {
  return middy(handler)
    .use(httpJsonBodyParser())
    .use(joiMiddleware({schema}));
}