require("../data/database");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const productsModel = require("../Models/Product");

exports.getAll = async (req, res) => {
  try {
    let products = await productsModel.find({}).populate("author");
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    let product = await productsModel
      .findOne({ id: req.params.id })
      .populate("author");
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.create = (req, res) => {
  const productItem = new productsModel(req.body);
  productItem.save().then(() => res.send(productItem));
};

exports.update = (req, res) => {
  productsModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updateProduct) => {
      err ? res.status(500).send("error") : res.status(200).send(updateProduct);
    }
  );
};

exports.delete = (req, res) => {
  productsModel.findOneAndDelete(
    { id: req.body.id },
    { $set: req.body },
    (err) => {
      err ? res.status(500).send(err) : res.status(200).send({});
    }
  );
};
