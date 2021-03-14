var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var author = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, match: /@/, required: true },
    country: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Author', author);
