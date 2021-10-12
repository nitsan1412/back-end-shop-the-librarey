require("../data/database");
const mongoose = require("mongoose");

const postsModel = require("../Models/Post");

exports.getAll = async (req, res) => {
  try {
    let posts = await postsModel
      .find({})
      .populate("writer")
      .populate({
        path: "comments",
        populate: { path: "user" },
      });
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    let post = await postsModel
      .findOne({ id: req.params.id })
      .populate("writer")
      .populate({
        path: "comments",
        populate: { path: "user" },
      });
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.create = (req, res) => {
  const postItem = new postsModel(req.body);
  postItem.save().then(() => res.send(postItem));
};

exports.update = (req, res) => {
  postsModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updatePost) => {
      err ? res.status(500).send("error") : res.status(200).send(updatePost);
    }
  );
};

exports.delete = (req, res) => {
  postsModel.findOneAndDelete(
    { id: req.body.id },
    { $set: req.body },
    (err) => {
      err ? res.status(500).send(err) : res.status(200).send({});
    }
  );
};
