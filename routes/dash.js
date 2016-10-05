var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('dash', { title: 'Admin' });
});

router.post('/', function (req, res) {
    if (req.body.myselection === 'exit') {
        res.redirect('logout');
    }
});


module.exports = router;
