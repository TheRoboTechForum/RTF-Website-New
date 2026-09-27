const { google } = require('googleapis');

// Load and parse credentials from process.env.GOOGLE_SERVICE_ACCOUNT_KEY
const getGoogleAuth = () => {
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey || serviceAccountKey === '{}') {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is missing or empty in .env');
  }

  // If credentials are formatted as a JSON string in .env
  const credentials = typeof serviceAccountKey === 'string' 
    ? JSON.parse(serviceAccountKey) 
    : serviceAccountKey;

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

const getSheetsInstance = () => {
  const auth = getGoogleAuth();
  return google.sheets({ version: 'v4', auth });
};

const getSpreadsheetId = () => {
  const spreadsheetId = process.env.SPREADSHEET_ID;
  if (!spreadsheetId) {
    throw new Error('SPREADSHEET_ID is missing from environment variables');
  }
  return spreadsheetId;
};

const initializeSheetHeaders = async () => {
  try {
    const sheets = getSheetsInstance();
    const spreadsheetId = getSpreadsheetId();
    const range = 'Sheet1!A1:H1';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    if (!response.data.values || response.data.values.length === 0) {
      const headers = [
        [
          'Full Name',
          'Temporary ID',
          'Personal Email ID',
          'Branch (expected)',
          'Expected Year of Passing',
          'Phone Number',
          'Domain applying to',
          'Status',
        ],
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        resource: { values: headers },
      });
    }
  } catch (error) {
    console.error('Error initializing Google Sheet headers:', error.message);
    throw error;
  }
};

/**
 * Reads existing sheet data and calculates the next sequence number for a domain.
 */
/**
 * Reads recruitment Google Sheet to determine the sequence number for a domain.
 */
const getNextDomainSequence = async (spreadsheetId, targetDomain) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A2:Z', // Adjust sheet tab name if different from Sheet1
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return 1;

    const normalizedTarget = targetDomain.trim().toLowerCase();

    // Filter rows matching the domain (assuming Domain is in Column G / Index 6)
    const matchingRows = rows.filter(row => {
      const rowDomain = row[6] ? row[6].trim().toLowerCase() : '';
      return rowDomain === normalizedTarget;
    });

    return matchingRows.length + 1;
  } catch (error) {
    console.error('Error calculating domain sequence from Sheet:', error);
    return 1; // Fallback to 1 if empty or on error
  }
};

const saveToGoogleSheet = async (dataArray) => {
  try {
    const sheets = getSheetsInstance();
    const spreadsheetId = getSpreadsheetId();

    await initializeSheetHeaders();

    const formattedValues = dataArray.map((item) => [
      item.name || '',
      item.tempId || '',
      item.personalEmail || '',
      item.branch || '',
      item.yearOfPassing || '',
      item.phone || '',
      item.domain || '',
      item.status || 'pending',
    ]);

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: { values: formattedValues },
    });

    return response.data;
  } catch (error) {
    console.error('Error appending data to Google Sheet:', error.message);
    throw error;
  }
};

module.exports = { saveToGoogleSheet ,
  getNextDomainSequence,
};