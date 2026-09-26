// controllers/recruitmentController.js

const { getUserById, updateUser } = require("../models/userModel");
const {
  generateRtfId,
} = require("../services/idGeneratorService");


/**
 * APPROVE APPLICANT CONTROLLER
 * Path: PATCH /api/recruitment/approve/:uid
 */
const approveApplicant = async (req, res) => {
  try {
    const { uid } = req.params;

    // 1. Fetch applicant
    const user = await getUserById(uid);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "Applicant not found.",
      });
    }

    // 2. Check if already approved
    if (user.status === "active") {
      return res.status(400).json({
        success: false,
        error: "Applicant is already approved.",
      });
    }

    // 3. Generate official RTF ID
    const officialRtfId = await generateRtfId(
      user.domain,
      user.yearOfPassing
    );

    // 4. Update applicant
    await updateUser(uid, {
      rtfId: officialRtfId,
      tempRtfId: user.rtfId,
      status: "active",
      approvedBy: req.user?.uid || "admin",
      approvedAt: Date.now(),
    });

    // 5. Return response
    return res.status(200).json({
      success: true,
      message: "Applicant approved successfully.",
      data: {
        uid,
        officialRtfId,
        status: "active",
      },
    });
  } catch (error) {
    console.error("Error in approveApplicant controller:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  approveApplicant,
};