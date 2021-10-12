require("../data/database");
const mongoose = require("mongoose");

const ticketsModel = require("../Models/Tickets");

exports.getAll = async (req, res) => {
  try {
    let tickets = await ticketsModel.find({}).populate("user");
    res.status(200).send(tickets);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    let ticket = await ticketsModel
      .findOne({ id: req.params.id })
      .populate("user");
    res.status(200).send(ticket);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.create = (req, res) => {
  const ticketItem = new ticketsModel(req.body);
  ticketItem.save().then(() => res.send(ticketItem));
};

exports.update = (req, res) => {
  ticketsModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updateTicket) => {
      err ? res.status(500).send("error") : res.status(200).send(updateTicket);
    }
  );
};

exports.delete = (req, res) => {
  ticketsModel.findOneAndDelete(
    { id: req.body.id },
    { $set: req.body },
    (err) => {
      err ? res.status(500).send(err) : res.status(200).send({});
    }
  );
};
