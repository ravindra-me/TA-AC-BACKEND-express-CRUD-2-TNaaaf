var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var book = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  pages: Number,
  publication: { type: String, required: true },
  category: { type: String, required: true },
  coverImage: String,
  authorId: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
});

module.exports = mongoose.model('Book', book);
