var express = require('express');
const { get, route } = require('.');
const { render } = require('../app');
var router = express.Router();
var Article = require('../models/Article');

/* GET users listing. */

router.get('/new', (req, res) => {
  res.render('form');
});

router.get('/', (req, res, next) => {
  Article.find({}, (err, content) => {
    if (err) return next(err);
    res.render('article', { data: content });
  });
});

router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.split(',');
  console.log(req.body);
  Article.create(req.body, (err, content) => {
    if (err) return next(content);
    res.redirect('/users');
  });
});

router.get('/:id/details', (req, res, next) => {
  Article.findById(req.params.id, (err, content) => {
    if (err) return next(err);
    res.render('details', { data: content });
  });
});

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

router.get('/:id/delete', (req, res, next) => {
  Article.findByIdAndDelete(req.params.id, (err, content) => {
    if (err) return next(err);
    res.redirect('/users');
  });
});

// increment and decrement of likes

router.get('/:id/inc', (req, res, next) => {
  console.log(req.params.id);
  let article = Article.findById(req.params.id);

  Article.findByIdAndUpdate(req.params.id, {
    $inc: { 'article.likes': 1 },
  }),
    { new: true },
    (err, content) => {
      console.log(content);
      if (err) return next(err);
      res.render('details', { data: content });
    };
});

module.exports = router;
