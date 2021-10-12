const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  ticketId: Number,
  status: String,
  User: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  header: String,
  content: String,
  response: String,
});

module.exports = mongoose.model("Ticket", ticketSchema);
