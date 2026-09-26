function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    next();
  };
}
async function approveUser(uid, approvedBy) {
  const user = await getUserByUid(uid);

  if (!user) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }

  if (user.status !== 'pending') {
    const err = new Error('User is not pending approval');
    err.statusCode = 400;
    throw err;
  }

  return user;
}
module.exports = requireRole;