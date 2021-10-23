const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(`${process.env.LINK_TO_ATLAS}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo local db is connected"));
