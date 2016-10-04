var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Constellation' });
});

router.post('/', function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    res.send('Post page');
});

module.exports = router;
