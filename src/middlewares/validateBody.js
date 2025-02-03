import createError from 'http-errors';

export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.details.map((e) => e.message).join(', '));
    }
    next();
  };
};
