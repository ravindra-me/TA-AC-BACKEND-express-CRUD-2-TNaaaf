let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let article = new Schema(
  {
    title: String,
    description: { type: String, required: true },
    tags: [String],
    author: { type: String, required: true },
    likes: Number,
  },
  {
    timestamps: true,
  }
);

let Article = mongoose.model('Article', article);
module.exports = Article;
