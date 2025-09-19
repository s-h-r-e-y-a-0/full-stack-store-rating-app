// backend/middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Prisma unique violation code for Postgres is P2002
  if (err && err.code === 'P2002') {
    return res.status(409).json({ error: 'Duplicate value', meta: err.meta || null });
  }

  // Basic validation for HTTP-friendly errors (optional)
  if (err && err.status && typeof err.status === 'number') {
    return res.status(err.status).json({ error: err.message || 'Error', details: err });
  }

  // Fallback
  res.status(500).json({ error: err?.message || 'Internal Server Error' });
};
