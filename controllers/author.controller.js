require("../data/database");
const authorsModel = require("../Models/Author");

exports.getAll = (req, res) => {
  authorsModel.find({}, (err, authors) => {
    err ? res.status(500).send("error") : res.json(authors);
  });
};

exports.getOne = async (req, res) => {
  try {
    let author = await authorsModel.findOne({ id: req.params.id });
    res.status(200).send(author);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.create = (req, res) => {
  const authorItem = new authorsModel(req.body);
  authorItem.save().then(() => res.send(authorItem));
};

exports.update = (req, res) => {
  authorsModel.findOneAndUpdate(
    { id: req.body.id },
    { $set: req.body },
    (err, updateAuthor) => {
      err ? res.status(500).send("error") : res.status(200).send(updateAuthor);
    }
  );
};

exports.delete = (req, res) => {
  authorsModel.findOneAndDelete(
    { id: req.body.id },
    { $set: req.body },
    (err) => {
      err ? res.status(500).send(err) : res.status(200).send({});
    }
  );
};
