const express = require('express');
const router = express.Router();

const { checkRtfId } = require('../controllers/userController');

router.get('/check/:rtfId', checkRtfId);

module.exports = router;