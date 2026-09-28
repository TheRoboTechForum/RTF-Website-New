// utils/asyncHandler.js
// ─────────────────────────────────────────────────────────────
// Every controller function is async (it awaits Firebase calls).
// Without this wrapper, every single controller would need its
// own try/catch, and a forgotten one crashes the whole server on
// an unhandled promise rejection.
//
// Wrap every controller export in this. It catches any thrown
// error and forwards it to next(err) — which sends it straight
// to middlewares/errorHandler.js instead of crashing the process.
// ─────────────────────────────────────────────────────────────

/**
 * @param {Function} fn - an async (req, res, next) controller function
 * @returns {Function} the same function, with errors auto-forwarded to next()
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;