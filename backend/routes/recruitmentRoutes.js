const express = require('express');
const router = express.Router();

const {
  // getAnnouncements,
  // createAnnouncement,
  applyRecruitment,
  // getApplicants,
  // convertApplicant,
} = require('../controllers/recruitmentController');

// 1. GET /api/recruitment/announcements - Fetch current announcements
// router.get('/announcements', getAnnouncements);

// // 2. POST /api/recruitment/announcements - Super Admin posts new announcement
// router.post('/announcements', createAnnouncement);

// 3. POST /api/recruitment/apply - Applicant submits form -> appended to sheet
router.post('/apply', applyRecruitment);

// 4. GET /api/recruitment/applicants - Admin/Super Admin views applicants (filtered by domain)
// router.get('/applicants', getApplicants);

// 5. POST /api/recruitment/convert/:id - Converts a temp applicant into a permanent Firestore user
// router.post('/convert/:id', convertApplicant);

module.exports = router;