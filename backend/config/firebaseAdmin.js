require('dotenv').config();

const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getDatabase } = require('firebase-admin/database');

const firebaseConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase Admin initialized');
} else {
  app = getApps()[0];
}

const db = getDatabase(app);

module.exports = { db };