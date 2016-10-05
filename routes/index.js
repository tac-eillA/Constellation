var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Constellation' });
});

router.post('/', function (req, res) {

    if (req.body.username === 'admin' && req.body.password === 'constellation') {
        res.redirect('/dash');
    }
});

module.exports = router;
