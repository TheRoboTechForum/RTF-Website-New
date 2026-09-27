const { saveToGoogleSheet, getNextDomainSequence } = require('../services/sheetsService');
// Replace with your Firestore DB instance import path
// const db = require('../config/db'); 
// const { db } = require('../config/firebaseAdmin');

/**
 * 1. GET /api/recruitment/announcements
 * Purpose: Fetch current announcements
 */
// const getAnnouncements = async (req, res) => {
//   try {
//     const snapshot = await db.collection('announcements').get();
//     const announcements = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     return res.status(200).json({
//       success: true,
//       data: announcements,
//     });
//   } catch (error) {
//     console.error('Error fetching announcements:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch announcements',
//       error: error.message,
//     });
//   }
// };

// /**
//  * 2. POST /api/recruitment/announcements
//  * Purpose: Super Admin posts a new announcement
//  */
// const createAnnouncement = async (req, res) => {
//   try {
//     const { title, content, targetAudience } = req.body;

//     if (!title || !content) {
//       return res.status(400).json({
//         success: false,
//         message: 'Title and content are required',
//       });
//     }

//     const newAnnouncement = {
//       title,
//       content,
//       targetAudience: targetAudience || 'all',
//       createdAt: new Date().toISOString(),
//     };

//     const docRef = await db.collection('announcements').add(newAnnouncement);

//     return res.status(201).json({
//       success: true,
//       message: 'Announcement posted successfully',
//       id: docRef.id,
//     });
//   } catch (error) {
//     console.error('Error creating announcement:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to create announcement',
//       error: error.message,
//     });
//   }
// };

/**
 * 3. POST /api/recruitment/apply
 * Purpose: Applicant submits form -> appended to sheet & saved in Firestore
 */

/**
 * Generates a temporary ID with the -T marker.
 * Example format: SD27-T01@RTF
 */
/**
 * Generates a domain-specific sequential temporary ID.
 * Example: domain = "Electronics", year = "2027", seq = 1 -> EL27-T01@RTF
 */
// const generateTempId = (domain = '', yearOfPassing = '', seqNumber = 1) => {
//   const cleanDomain = domain.trim().toUpperCase();
//   const words = cleanDomain.split(' ');

//   // Extract 2-letter domain code (e.g. "Software Development" -> "SD", "Electronics" -> "EL")
//   const domainCode = words.length > 1
//     ? (words[0][0] + words[1][0]).substring(0, 2)
//     : cleanDomain.substring(0, 2) || 'RT';

//   // 2-digit year suffix
//   const yearSuffix = yearOfPassing ? String(yearOfPassing).slice(-2) : '27';

//   // Pad sequence number to 2 digits (e.g., 1 -> "01", 2 -> "02")
//   const formattedSeq = String(seqNumber).padStart(2, '0');

//   return `${domainCode}${yearSuffix}-T${formattedSeq}@RTF`;
// };

/**
 * POST /api/recruitment/apply
 * Purpose: Applicant submits form -> Temporary ID generated -> Appended ONLY to Google Sheet
 */
const applyRecruitment = async (req, res) => {
  try {
    const { name, personalEmail, branch, yearOfPassing, phone, domain } = req.body;

    // Validation
    if (!name || !personalEmail || !phone || !domain) {
      return res.status(400).json({
        success: false,
        message: 'Name, personalEmail, phone, and domain are required fields',
      });
    }

    // 1. Get next sequence count for this domain from Google Sheet
    const nextSeq = await getNextDomainSequence(process.env.SPREADSHEET_ID, domain);

    // 2. Generate temporary ID (e.g. SD27-T01@RTF)
    const tempId = generateTempId(domain, yearOfPassing, nextSeq);

    const applicantData = {
      name,
      tempId,
      personalEmail,
      branch: branch || '',
      yearOfPassing: yearOfPassing || '',
      phone: phone || '',
      domain: domain.trim().toLowerCase(),
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // 3. Append row directly to Google Sheet
    await saveToGoogleSheet([applicantData]);

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully to Google Sheet!',
      temporaryId: tempId,
      sequenceNumber: nextSeq,
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message,
    });
  }
};
// Mapping for the 4 official domains
const DOMAIN_PREFIXES = {
  software: 'SD',      // Software Development
  electronics: 'ED',   // Electronics
  mechanical: 'MD',    // Mechanical
  aeromodelling: 'AD', // Aeromodelling
};

/**
 * Generates temporary ID using domain-specific sequence.
 * Examples: SD27-T01@RTF, EL27-T01@RTF, ME27-T01@RTF, AM27-T01@RTF
 */
const generateTempId = (domain = '', yearOfPassing = '', seqNumber = 1) => {
  const normalizedDomain = domain.trim().toLowerCase();
  
  // Get 2-letter prefix or default to RT
  const domainPrefix = DOMAIN_PREFIXES[normalizedDomain] || 'RT';

  // 2-digit year suffix
  const yearSuffix = yearOfPassing ? String(yearOfPassing).slice(-2) : '27';

  // Format sequence number to 2 digits (1 -> "01", 2 -> "02")
  const formattedSeq = String(seqNumber).padStart(2, '0');

  return `${domainPrefix}${yearSuffix}-T${formattedSeq}@RTF`;
};
/**
 * 4. GET /api/recruitment/applicants
 * Purpose: Admin/Super Admin views applicants (filtered optionally by domain)
 */
// const getApplicants = async (req, res) => {
//   try {
//     const { domain } = req.query;
//     let query = db.collection('temp_applicants');

//     if (domain) {
//       query = query.where('domain', '==', domain);
//     }

//     const snapshot = await query.get();
//     const applicants = snapshot.docs.map((doc) => doc.data());

//     return res.status(200).json({
//       success: true,
//       count: applicants.length,
//       data: applicants,
//     });
//   } catch (error) {
//     console.error('Error fetching applicants:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to fetch applicants',
//       error: error.message,
//     });
//   }
// };

// /**
//  * 5. POST /api/recruitment/convert/:id
//  * Purpose: Converts a temp applicant into a permanent Firestore user
//  */
// const convertApplicant = async (req, res) => {
//   try {
//     const { id } = req.params; // tempId passed in URL parameter

//     const tempDocRef = db.collection('temp_applicants').doc(id);
//     const tempDoc = await tempDocRef.get();

//     if (!tempDoc.exists) {
//       return res.status(404).json({
//         success: false,
//         message: 'Temporary applicant record not found',
//       });
//     }

//     const applicantData = tempDoc.data();

//     // Generate permanent user RTF ID (e.g., RTF26982)
//     const yearSuffix = applicantData.yearOfPassing
//       ? String(applicantData.yearOfPassing).slice(-2)
//       : '26';
//     const randomNum = Math.floor(100 + Math.random() * 900);
//     const officialRtfId = `RTF${yearSuffix}${randomNum}`;

//     const permanentUserData = {
//       ...applicantData,
//       officialRtfId,
//       status: 'active',
//       convertedAt: new Date().toISOString(),
//     };

//     // Store in permanent users collection & update temp record status
//     await db.collection('users').doc(officialRtfId).set(permanentUserData);
//     await tempDocRef.update({
//       status: 'converted',
//       officialRtfId,
//       convertedAt: new Date().toISOString(),
//     });

//     return res.status(200).json({
//       success: true,
//       message: 'Applicant successfully converted to permanent user',
//       user: permanentUserData,
//     });
//   } catch (error) {
//     console.error('Error converting applicant:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to convert applicant',
//       error: error.message,
//     });
//   }
// };

module.exports = {
  // getAnnouncements,
  // createAnnouncement,
   applyRecruitment,
  // getApplicants,
  // convertApplicant,
};