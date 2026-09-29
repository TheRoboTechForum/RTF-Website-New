const { google } = require('googleapis');

// Load environment variables
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
// Handle line breaks in private key if loaded from .env
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY
  ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : null;

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: CLIENT_EMAIL,
    private_key: PRIVATE_KEY,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Appends a new user registration row to Google Sheets
 * @param {Object} userData - User registration details
 */
async function appendUserToSheet(userData) {
  try {
    const formattedDate = new Date(userData.createdAt).toISOString();

    // Matching exact sheet column order:
    // Name | Enrollment No | College Email | Personal Email | Branch | Year of Passing | Phone | Domain | RTF ID | Status | Registered At
    const rowValues = [
      userData.name,
      userData.collegeEnrollmentNo,
      userData.collegeEmail,
      userData.personalEmail,
      userData.branch,
      userData.yearOfPassing,
      userData.phone,
      userData.domain,
      userData.rtfId,
      userData.status,
      formattedDate,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:K', // Adjust sheet tab name if different from 'Sheet1'
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    });

    console.log(`[Google Sheets] Successfully logged registration for ${userData.rtfId}`);
  } catch (error) {
    // Non-blocking error logging to prevent registration failure if Sheets API fails
    console.error('[Google Sheets Error] Failed to append registration row:', error.message);
  }
}

module.exports = {
  appendUserToSheet,
};