var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Constellation' });
});

router.post('/', function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);
    if (req.body.username === 'admin' && req.body.password === 'constellation') {
        router.get('./dash', function(req, res, next) {
          res.render('dash', { title: 'Admin' });
        });
    }
});

module.exports = router;
