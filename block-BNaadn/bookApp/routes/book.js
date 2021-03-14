var express = require('express');
const { render } = require('../app');
var router = express.Router();
var Book = require('../models/Book');

/* GET users listing. */
router.get('/', (req, res, next) => {
  Book.find({})
    .populate('authorId')
    .exec((err, content) => {
      if (err) return next(err);
      res.render('listBook', { data: content });
    });
});

router.get('/:id/author', (req, res, next) => {
  var idOfAuthor = req.params.id;
  res.render('addBook', { authorId: idOfAuthor });
});

router.get('/:id', (req, res, next) => {
  Book.findById(req.params.id)
    .populate('authorId')
    .exec((err, content) => {
      if (err) return next(err);
      res.render('book', { data: content });
    });
});

router.get('/:id/listBook', (req, res, next) => {
  Book.find({ authorId: req.params.id })
    .populate('authorId')
    .exec((err, content) => {
      if (err) return next(err);
      res.render('listBook', { data: content });
    });
});

router.post('/:id/author', (req, res, next) => {
  var authorId = req.params.id;
  req.body.authorId = authorId;
  Book.create(req.body, (err, content) => {
    if (err) return next(err);
    res.redirect('/book/' + authorId + '/listBook');
  });
});

module.exports = router;
