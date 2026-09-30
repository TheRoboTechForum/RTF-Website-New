const { db } = require('../config/firebaseAdmin');

const DOMAIN_CODE_MAP = {
  software: 'SD',
  electrical: 'ED',
  aeronautics: 'AD',
  mechanical: 'MD',
  aero: 'AD',
  mech: 'MD',
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

function generateTemporaryRtfId(domain, phone) {
  const normalizedDomain = String(domain || '').trim().toLowerCase();
  const normalizedPhone = String(phone || '').replace(/\D/g, '');

  if (!normalizedDomain) {
    throw new Error('Domain is required to generate temporary RTF ID.');
  }

  if (!normalizedPhone || normalizedPhone.length !== 10) {
    throw new Error('A valid 10-digit phone number is required to generate temporary RTF ID.');
  }

  return `${normalizedDomain}${normalizedPhone}@rtf`;
}

module.exports = {
  generateRtfId: generateRTFId,
  generateTemporaryRtfId,
};