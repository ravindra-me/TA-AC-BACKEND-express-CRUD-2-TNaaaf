let mongoose = require('mongoose');
const { schema } = require('./Comment');
let Schema = mongoose.Schema;
let article = new Schema(
  {
    title: String,
    description: { type: String, required: true },
    tags: [String],
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

let Article = mongoose.model('Article', article);
module.exports = Article;
