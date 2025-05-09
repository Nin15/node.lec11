const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
const userRouter = require("./users/users.router");
const connectToDb = require("./db/db");
const authRouter = require("./auth/auth.route");
const isAuth = require("./middleware/isAuth.middleware");
const postRouter = require("./posts/posts.router");
connectToDb();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/posts", isAuth, postRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

// app.listen(3000, () => {
//   console.log("server running on http://localhost:3000");
// });
const serverless = require("serverless-http");
module.exports.handler = serverless(app);
