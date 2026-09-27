const { db } = require('../config/firebaseAdmin');

const DOMAIN_CODE_MAP = {
  Software: 'SD',
  Electrical: 'ED',
  'Aero+Mech': 'AMD',
};

async function generateRTFId(domain, yearOfPassing) {
  const code = DOMAIN_CODE_MAP[domain];

  if (!code) {
    throw new Error(`Unsupported domain: ${domain}`);
  }

  const year = Number(yearOfPassing);

  if (!Number.isInteger(year)) {
    throw new Error('Invalid year of passing');
  }

  const yy = String(year).slice(-2);

  // One atomic counter for each domain + passing year.
  const counterKey = `${domain}_${yearOfPassing}`
    .replace(/[.#$[\]/]/g, '_');

  const counterRef = db.ref(`rtfIdCounters/${counterKey}`);

  const transactionResult = await counterRef.transaction(
    (currentValue) => {
      return (currentValue || 0) + 1;
    }
  );

  if (!transactionResult.committed) {
    throw new Error('Failed to generate RTF ID');
  }

  const serial = String(transactionResult.snapshot.val()).padStart(2, '0');

  return `${code}${yy}${serial}@RTF`;
}

module.exports = {
  generateRtfId,
};