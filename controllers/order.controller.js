require("../data/database");
// const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const ordersModel = require("../Models/Order");

exports.getAll = async (req, res) => {
  try {
    let orders = await ordersModel
      .find({})
      .populate("user")
      .populate({
        path: "products",
        populate: { path: "item" },
      });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    let order = await ordersModel
      .findOne({ id: req.params.id })
      .populate("user")
      .populate({
        path: "products",
        populate: { path: "item" },
      });
    res.status(200).send(order);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.perUser = async (req, res) => {
  try {
    let orders = await ordersModel
      .find({ user: new ObjectId(req.body.user) })
      .populate({
        path: "products",
        populate: { path: "item" },
      })
      .exec()
      .then((orders) => {
        res.status(200).json({ orders });
      });
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.create = (req, res) => {
  const orderItem = new ordersModel(req.body);
  orderItem.save().then(() => res.send(orderItem));
};

exports.update = (req, res) => {
  ordersModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updateOrder) => {
      err ? res.status(500).send("error") : res.status(200).send(updateOrder);
    }
  );
};

exports.delete = (req, res) => {
  ordersModel.findOneAndDelete(
    { id: req.body.id },
    { $set: req.body },
    (err) => {
      err ? res.status(500).send(err) : res.status(200).send({});
    }
  );
};
