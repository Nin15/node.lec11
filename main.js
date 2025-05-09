const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.options("*", cors());

app.use(express.json());

const connectToDb = require("./db/db");
connectToDb();

const userRouter = require("./users/users.router");
const authRouter = require("./auth/auth.route");
const isAuth = require("./middleware/isAuth.middleware");
const postRouter = require("./posts/posts.router");

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", isAuth, postRouter);

module.exports = app;
module.exports.handler = serverless(app);
