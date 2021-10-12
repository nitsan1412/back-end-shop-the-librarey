const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
  id: Number,
  firstName: String,
  lastName: String,
});

module.exports = mongoose.model("author", authorSchema);
