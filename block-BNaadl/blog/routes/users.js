var express = require('express');
const { get, route } = require('.');
const { render } = require('../app');
var router = express.Router();
var Article = require('../models/Article');

/* GET users listing. */

// new article

router.get('/new', (req, res) => {
  res.render('form');
});

router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.split(',');
  console.log(req.body);
  Article.create(req.body, (err, content) => {
    if (err) return next(content);
    res.redirect('/users');
  });
});

// articles page
router.get('/', (req, res, next) => {
  Article.find({}, (err, content) => {
    if (err) return next(err);
    res.render('article', { data: content });
  });
});

// details page
router.get('/:id/details', (req, res, next) => {
  Article.findById(req.params.id, (err, content) => {
    if (err) return next(err);
    res.render('details', { data: content });
  });
});

// edit data page
router.get('/:id/edit', (req, res, next) => {
  Article.findById(req.params.id, req.body, (err, content) => {
    if (err) return next(err);
    content.tags = content.tags.join('');
    res.render('editForm', { data: content });
  });
});

router.post('/:id', (req, res, next) => {
  req.body.tags = req.body.tags.split(',');
  Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, content) => {
      if (err) return next(err);
      res.redirect('/users');
    }
  );
});
// delete the article
router.get('/:id/delete', (req, res, next) => {
  Article.findByIdAndDelete(req.params.id, (err, content) => {
    if (err) return next(err);
    res.redirect('/users');
  });
});

// increment and decrement of likes

router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id, (err, content) => {
    if (err) return next(err);
    res.render('details.ejs', { data: content });
  });
});

router.get('/:id/like', (req, res, next) => {
  console.log(req.params.id);
  Article.findByIdAndUpdate(
    req.params.id,
    { $inc: { likes: 1 } },
    (err, content) => {
      if (err) return next(err);
      res.redirect('/users/' + req.params.id);
    }
  );
});

module.exports = router;
