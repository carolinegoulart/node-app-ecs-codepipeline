export function errorHandler(err, req, res, _next) {
  const status = err.status || 500;
  
  const payload = {
    message: err.message || 'Internal Server Error',
    details: err.details || undefined
  };
  
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  res.status(status).json(payload);
}

export function notFound(_req, res) {
  res.status(404).json({ message: 'Rota não encontrada' });
}