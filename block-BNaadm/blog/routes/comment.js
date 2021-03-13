var express = require('express');
const Article = require('../models/Article');
var router = express.Router();
var Comment = require('../models/Comment');
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if (err) next(err);
    res.render('editComment', { data: comment });
  });
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, { new: true }, (err, comment) => {
    if (err) return next(err);
    res.redirect('/users/' + comment.articleId);
  });
});

router.get('/:id/delete', (req, res) => {
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      comment.articleId,
      {
        $pull: { comments: comment._id },
      },
      (err, updateArticle) => {
        if (err) return next(err);
        res.redirect('/users/' + comment.articleId);
      }
    );
  });
});

module.exports = router;
