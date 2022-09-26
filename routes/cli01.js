var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('cli01', { title: 'Dashboard IoT' });
});

module.exports = router;
