const express = require('express');
const router = express.Router();
const ActivityLog = require('../models/ActivityLog');

router.get('/', async (req, res) => {
  const logs = await ActivityLog.find().populate('user');
  res.send(logs);
});

module.exports = router;
