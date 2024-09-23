// server/middleware/logger.js
const ActivityLog = require('../models/ActivityLog');

const logger = async (req, res, next) => {
  const { user } = req;
  const action = `${req.method} ${req.originalUrl}`;
  const ipAddress = req.ip || req.connection.remoteAddress;

  if (user) {
    await ActivityLog.create({
      user: user._id,
      action,
      ipAddress,
    });
  }

  next();
};

module.exports = logger;