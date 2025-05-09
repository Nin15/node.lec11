const { Router } = require("express");
const postModel = require("../models/post.model");
const { isValidObjectId } = require("mongoose");

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  const posts = await postModel
    .find()
    .sort({ _id: -1 })
    .populate({ path: "author", select: "fullName email" });
  return res.status(200).json({ posts });
});

postRouter.post("/", async (req, res) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: "content is required" });
  }

  await postModel.create({ content, author: req.userId });
  return res.status(201).json({ message: "Post created successfully" });
});

postRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId) {
    return res.status(400).json({ message: "id is invalid" });
  }

  const post = await postModel.findById(id)
  if (post.author.toString() !== req.userId){
    return res.status(401).json({message: "You don't have permission!"})
  }

  await postModel.findByIdAndDelete(id)
  return res.status(200).json({message: "Post deleted successfully!"})
});

postRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId) {
    return res.status(400).json({ message: "id is invalid" });
  }

  const post = await postModel.findById(id)
  if (post.author.toString() !== req.userId){
    return res.status(401).json({message: "You don't have permission!"})
  }

  await postModel.findByIdAndUpdate(id)
  return res.status(200).json({message: "Post Updated successfully!"})
});
module.exports = postRouter;
