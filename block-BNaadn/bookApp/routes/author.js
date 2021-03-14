var express = require('express');
var router = express.Router();
var Author = require('../models/Author');

/* GET home page. */
router.get('/', function (req, res, next) {
  Author.find({}, (err, content) => {
    if (err) return next(err);
    res.render('authorList', { data: content });
  });
});

router.get('/new', (req, res) => {
  res.render('addAuthor');
});

router.post('/', (req, res) => {
  Author.create(req.body, (err, content) => {
    if (err) return next(err);
    console.log(content);
    res.redirect('/author');
  });
});

module.exports = router;
