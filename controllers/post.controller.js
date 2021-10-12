require("../data/database");
const postsModel = require("../Models/Post");

exports.getAll = (req, res) => {
  postsModel.find({}, (err, posts) => {
    err ? res.status(500).send("error") : res.json(posts);
  });
};

exports.getOne = (req, res) => {
  postsModel.findOne({ id: req.params.id }, (err, post) => {
    err ? res.status(500).send("error") : res.status(200).send(post);
  });
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
