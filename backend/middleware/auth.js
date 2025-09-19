// Add your JWT/session auth logic here later.
// For now this is a stub that allows everything through.
exports.requireAuth = (req, res, next) => {
  // e.g. check req.headers.authorization
  next();
};

exports.requireRole = (role) => (req, res, next) => {
  // check user role (req.user.role) after implementing auth
  next();
};
