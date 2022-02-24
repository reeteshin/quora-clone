const express = require("express");
const app = express();

app.use(express.json());

const userController = require("./controllers/user.controller");
const questionController = require("./controllers/question.controller.js");
const answerController = require("./controllers/answer.controller.js");
const commentController = require("./controllers/comment.controller.js");
const postController = require("./controllers/post.controller.js");

app.use("/user", userController);
app.use("/question", questionController);
app.use("/answer", answerController);
app.use("/comment", commentController);
app.use("/post", postController);

module.exports = app;