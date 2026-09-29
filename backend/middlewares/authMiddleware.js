// middlewares/authMiddleware.js
// ─────────────────────────────────────────────────────────────
// Protects routes that require a logged-in user. Not used by
// /register (that's public), but every dashboard/mail/recruitment-
// review route will use this.
//
// Usage: router.get('/me', authMiddleware, getMe);
//
// How it works:
//   1. Frontend sends the JWT it got at login in the header:
//      Authorization: Bearer <token>
//   2. We verify it, decode { uid, role, domain }
//   3. Attach it to req.user so every controller downstream can
//      read req.user.uid / req.user.role without re-checking
// ─────────────────────────────────────────────────────────────

const { verifyAccessToken } = require('../services/authServices');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer eyJhbGciOi..."

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'No token provided. Please log in.',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token); // throws if invalid/expired
    req.user = decoded; // e.g. { uid, role, domain }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Session expired or invalid. Please log in again.',
    });
  }
}

module.exports = authMiddleware;

// ─────────────────────────────────────────────────────────────
// roleMiddleware.js (build next, same folder) will look like:
//
// function requireRole(...allowedRoles) {
//   return (req, res, next) => {
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, error: 'Not authorized' });
//     }
//     next();
//   };
// }
// Usage: router.post('/approve', authMiddleware, requireRole('admin', 'superadmin'), approveUser);
// ─────────────────────────────────────────────────────────────