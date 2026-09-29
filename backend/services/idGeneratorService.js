const { db } = require('../config/firebaseAdmin');

const DOMAIN_CODE_MAP = {
  software: 'SD',
  electrical: 'ED',
  aeronautics: 'AD',
  mechanical: 'MD',
};

async function generateRTFId(domain, yearOfPassing) {
  const normalizedDomain = String(domain).trim().toLowerCase();
  const code = DOMAIN_CODE_MAP[normalizedDomain];

  if (!code) {
    throw new Error(`Unsupported domain: ${domain}`);
  }

  const year = Number(yearOfPassing);

  if (!Number.isInteger(year)) {
    throw new Error('Invalid year of passing');
  }

  const yy = String(year).slice(-2);

  // One atomic counter for each domain + passing year.
  const counterKey = `${normalizedDomain}_${yearOfPassing}`
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
  generateRtfId: generateRTFId,
};