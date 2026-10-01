export const validate =
  (schema) =>
  (req, _res, next) => {
    const data = {
      body: req.body,
      params: req.params,
      query: req.query
    };

    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      return next({ status: 400, message: 'Validation failed', details: parsed.error.flatten() });
    }

    req.body = parsed.data.body;
    req.params = parsed.data.params;
    req.query = parsed.data.query;

    next();
  };