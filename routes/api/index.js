var express = require('express');
var router = express.Router();

// Require the v1 API routes.
router.use('/v1', require('./v1'));

// Export the express application routes.
module.exports = router;