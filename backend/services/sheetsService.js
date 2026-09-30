const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY_SHEET || process.env.GOOGLE_PRIVATE_KEY;
const PRIVATE_KEY = rawPrivateKey
  ? rawPrivateKey
    .replace(/^['"]|['"]$/g, '')
    .replace(/\\n/g, '\n')
    .replace(/\r/g, '')
    .trim()
  : null;

if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
  throw new Error(
    'Missing Google Sheets env vars. Required: SPREADSHEET_ID, GOOGLE_CLIENT_EMAIL, and GOOGLE_PRIVATE_KEY_SHEET (or GOOGLE_PRIVATE_KEY).'
  );
}

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

    // Matching Sheet Column Order:
    // Name | Personal Email | Branch | Year of Passing | Phone | Domain | RTF ID | 10th % | 12th % | CET % | JEE Main % | Diploma % | Status | Registered At
    const rowValues = [
      userData.name || '',
      userData.personalEmail || '',
      userData.branch || '',
      userData.yearOfPassing || '',
      userData.phone || '',
      userData.domain || '',
      userData.rtfId || '',
      userData.tenthScore ?? '',
      userData.twelfthScore ?? '',
      userData.cetScore ?? '',
      userData.jeeMainScore ?? '',
      userData.diplomaScore ?? '',
      userData.status || 'pending',
      formattedDate,
    ];

    const currentSheet = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:A',
    });

    const existingRows = currentSheet.data.values || [];
    const nextRow = existingRows.length + 1;
    const targetRange = `Sheet1!A${nextRow}:N${nextRow}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: targetRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowValues],
      },
    });

    console.log(`[Google Sheets] Successfully wrote a new registration row to ${targetRange}.`);
    return true;
  } catch (error) {
    console.error('[Google Sheets Error] Failed to append registration row:', error.message);
    throw error;
  }
}

module.exports = {
  appendUserToSheet,
};