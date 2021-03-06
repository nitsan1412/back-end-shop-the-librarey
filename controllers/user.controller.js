require("../data/database");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const usersModel = require("../Models/User");

exports.getAll = async (req, res) => {
  try {
    let users = await usersModel.find({}).populate("product");
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    let user = await usersModel
      .findOne({ id: req.params.id })
      .populate("product");
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.create = (req, res) => {
  const userItem = new usersModel(req.body);
  userItem.save().then(() => res.send(userItem));
};

exports.update = (req, res) => {
  usersModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updateUser) => {
      err ? res.status(500).send("error") : res.status(200).send(updateUser);
    }
  );
};

exports.delete = (req, res) => {
  usersModel.findOneAndDelete(
    { id: req.body.id },
    { $set: req.body },
    (err) => {
      err ? res.status(500).send(err) : res.status(200).send({});
    }
  );
};
