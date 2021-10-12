const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { User } = require("./User");

const ticketSchema = new Schema({
  id: Number,
  status: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subject: String,
  date: String,
  header: String,
  content: String,
  response: String,
});

module.exports = mongoose.model("Ticket", ticketSchema);
