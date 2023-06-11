const defaults = {}

const joiMiddleware = (opts) => {
  const options = { ...defaults, ...opts };

  const customMiddlewareBefore = async (request) => {
    const { event } = request;
    const schema = options.schema;
    const { error } = schema.validate(event.body);
    if (error) {
      console.log("JOI validation error: ", error.message);
    }
  }

  return {
    before: customMiddlewareBefore
  }
}

export default joiMiddleware;