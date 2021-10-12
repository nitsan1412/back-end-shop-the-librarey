require("../data/database");
const ticketsModel = require("../Models/Ticket");

exports.getAll = (req, res) => {
  ticketsModel.find({}, (err, tickets) => {
    ticket = tickets.populate("user");
    err ? res.status(500).send("error") : res.json(tickets);
  });
};

exports.getOne = (req, res) => {
  ticketsModel.findOne({ id: req.params.id }, (err, ticket) => {
    ticket = tickets.populate("user");
    err ? res.status(500).send("error") : res.status(200).send(ticket);
  });
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
