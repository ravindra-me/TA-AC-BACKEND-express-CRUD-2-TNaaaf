let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let comment = new Schema(
  {
    content: { type: String, required: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Comment', comment);
