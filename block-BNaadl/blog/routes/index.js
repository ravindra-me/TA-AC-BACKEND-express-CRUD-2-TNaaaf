var express = require('express');
var router = express.Router();
var Article = require('../models/Article');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index.ejs');
});

module.exports = router;
