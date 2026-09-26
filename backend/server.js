// server.js
// ─────────────────────────────────────────────────────────────
// This is the ENTRY POINT of the backend. Everything starts here.
// Read this file top to bottom — it's written like a tutorial so
// you understand the *order* things must happen in, not just what
// each line does.
// ─────────────────────────────────────────────────────────────

// 1. Load environment variables FIRST — before anything else runs,
//    because config/firebaseAdmin.js (imported below) needs
//    process.env values to already exist when it initializes.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// This runs Firebase Admin SDK initialization as a side effect —
// see config/firebaseAdmin.js. We import it here (even though we
// don't use the variable) so it initializes once, at boot, not
// every time a model file happens to require it.
require('./config/firebaseAdmin');

const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// As you build more modules, import their routers the same way:
// const recruitmentRoutes = require('./routes/recruitmentRoutes');
// const mailRoutes = require('./routes/mailRoutes');
// const roomRoutes = require('./routes/roomRoutes');

const app = express();

// 2. MIDDLEWARE — these run on EVERY request, in this exact order.
//    Order matters: cors before routes, json parser before anything
//    that reads req.body, etc.

// Allow the frontend (running on a different port in dev) to call us.
app.use(cors({
  origin: process.env.CLIENT_URL, // e.g. http://localhost:5173
  credentials: true,              // needed if we ever switch to cookie-based JWT
}));

// Parse incoming JSON bodies into req.body — without this,
// req.body would be undefined on every POST/PUT request.
app.use(express.json());

// Parse cookies into req.cookies — used later if you move JWT
// storage from response-body to an httpOnly cookie.
app.use(cookieParser());

// Log every request to the console in dev — helps you SEE what's
// hitting your server while testing with Postman/the frontend.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// 3. ROUTES — each module gets its own router, mounted at its own
//    base path. The router file itself defines what happens under
//    that path (see routes/authRoutes.js for a fully commented example).
app.use('/api/auth', authRoutes);
// app.use('/api/recruitment', recruitmentRoutes);
// app.use('/api/mail', mailRoutes);
// app.use('/api/room', roomRoutes);
app.use('/api/users', userRoutes);//to check if user is there from rfID
// A simple health-check route — useful to confirm the server is up
// before you even test a real endpoint.
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'RTF backend is running' });
});

// 4. ERROR HANDLER — must be registered LAST, after all routes.
//    Express recognizes this as an error handler because it takes
//    4 arguments (err, req, res, next). Any error passed to next(err)
//    anywhere in the app ends up here. See middlewares/errorHandler.js.
app.use(errorHandler);

// 5. START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ RTF backend running on http://localhost:${PORT}`);
});