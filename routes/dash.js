var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dash', function(req, res, next) {
  res.render('dash', { title: 'Admin' });
});


module.exports = router;
