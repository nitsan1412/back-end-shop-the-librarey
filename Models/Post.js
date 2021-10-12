const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { User } = require("./User");

const postSchema = new Schema({
  id: Number,
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: String,
  approved: Boolean,
  headline: String,
  text: String,
  comments: [
    {
      commentID: Number,
      approved: Boolean,
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      headline: String,
      text: String,
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
