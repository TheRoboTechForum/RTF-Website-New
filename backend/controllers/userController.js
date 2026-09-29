const userModel = require('../models/userModel');

const asyncHandler = require('../utils/asyncHandler');

const checkRtfId = asyncHandler(async (req, res) => {
  const { rtfId } = req.params;

  // Extract year from RTF ID
  // Example: SD27-T01@RTF → 27 → 2027
  const yearMatch = rtfId.match(/^[A-Z]+(\d{2})-/);

  if (!yearMatch) {
    const err = new Error('Invalid RTF ID');
    err.statusCode = 400;
    throw err;
  }

  const yearOfPassing = `20${yearMatch[1]}`;

  const exists = await userModel.rtfIdExists(
    yearOfPassing,
    rtfId
  );

  res.status(200).json({
    success: true,
    data: {
      exists,
    },
  });
});

module.exports = {
  checkRtfId,
};