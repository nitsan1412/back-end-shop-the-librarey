const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentID: Number,
  approved: Boolean,
  writerUserId: Number,
  headline: String,
  text: String,
});

const postSchema = new Schema({
  id: Number,
  writerUserId: Number,
  // writerUserId: { type: Schema.Types.ObjectId, ref: "User" },
  writer: {
    firstName: String,
    lastName: String,
  },
  date: String,
  approved: Boolean,
  headline: String,
  text: String,
  comments: [commentSchema],
});

// postSchema.set

module.exports = mongoose.model("Post", postSchema);
