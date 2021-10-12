const express = require("express");
const userRouter = require("./routes/users");
const productRouter = require("./routes/products");
const authorRouter = require("./routes/authors");
const postRouter = require("./routes/posts");
const orderRouter = require("./routes/orders");
const cors = require("cors");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");
  res.setHeader("Content-Range", "bytes : 0-9/*");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("hello");
// });

// app.post("/", (req, res) => {
//   console.log(req.body.name);
// });

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/authors", authorRouter);
app.use("/posts", postRouter);
app.use("/orders", orderRouter);

app.listen(5000);
