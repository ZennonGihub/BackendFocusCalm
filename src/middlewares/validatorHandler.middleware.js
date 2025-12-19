import boom from "@hapi/boom";

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

export default validatorHandler;
