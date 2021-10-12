require("../data/database");
const mongoose = require("mongoose");

const ordersModel = require("../Models/Order");

exports.getAll = (req, res) => {
  ordersModel.find({}, (err, orders) => {
    order = orders.populate("product").populate("user");

    err ? res.status(500).send("error") : res.json(orders);
  });
};

exports.getOne = (req, res) => {
  ordersModel.findOne({ id: req.params.id }, (err, order) => {
    order = orders.populate("product").populate("user");
    err ? res.status(500).send("error") : res.status(200).send(order);
  });
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
