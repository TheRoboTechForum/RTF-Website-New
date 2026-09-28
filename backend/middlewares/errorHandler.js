// middlewares/errorHandler.js
// ─────────────────────────────────────────────────────────────
// This is the LAST middleware registered in server.js. Express
// knows it's an error handler because it has 4 parameters
// (err, req, res, next) — that signature is mandatory, don't
// remove the unused `next` param even though we don't call it.
//
// Every error in the app — thrown in a controller, forwarded by
// asyncHandler, or manually passed via next(err) — ends up here,
// and this is the ONLY place we send an error response to the
// client. This keeps every error response the same shape, which
// is what the frontend's error-handling relies on
// (see src/services/authService.js).
// ─────────────────────────────────────────────────────────────

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error('❌', err.message);

  // If a controller/service threw an error with a specific
  // .statusCode set (see authController.js for an example),
  // use it. Otherwise default to 500 (unexpected server error).
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: err.message || 'Something went wrong on the server',
  });
}

module.exports = errorHandler;