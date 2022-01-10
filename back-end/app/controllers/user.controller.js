var User = require("../models/user.model.js");

exports.create = function (req, res) {
  if (!req.body) {
    res.status(400).send({ message: "Empty entry not allowed" });
  }

  var note = new User({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number,
    password: req.body.password,
  });

  note.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while creating the entry." });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = function (req, res) {
  User.find(function (err, notes) {
    if (err) {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving ." });
    } else {
      res.send(notes);
    }
  });
};

exports.findOne = function (req, res) {
  User.findById(req.params.userId, function (err, data) {
    if (err) {
      res.status(500).send({
        message: "Could not retrieve note with id " + req.params.userId,
      });
    } else {
      res.send(data);
    }
  });
};

exports.update = function (req, res) {
  // Update a note identified by the noteId in the request
  User.findById(req.params.userId, function (err, user) {
    if (err) {
      res.status(500).send({
        message: "Could not find a note with id " + req.params.userId,
      });
    }

    user.name = req.body.name;
    user.email = req.body.email;
    user.number = req.body.number;
    user.password = req.body.password;

    user.save(function (err, data) {
      if (err) {
        res.status(500).send({
          message: "Could not update user with id " + req.params.noteId,
        });
      } else {
        res.send(data);
      }
    });
  });
};

exports.delete = function (req, res) {
  User.remove({ _id: req.params.userId }, function (err, data) {
    if (err) {
      res
        .status(500)
        .send({ message: "Could not delete note with id " + req.params.id });
    } else {
      res.send({ message: "User deleted successfully!" });
    }
  });
};
