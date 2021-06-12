var db = require("../db");
var mongodb = require("mongodb");

const { validationResult } = require("express-validator");

db.connect("mongodb://localhost:27017", function (err) {
  if (err) {
    throw "Fallo en la conexión con la BD";
  }
});

// GET
module.exports.users_list = function (req, res) {
  db.get()
    .db("apidb")
    .collection("users")
    .find()
    .toArray(function (err, result) {
      if (err) {
        throw "Fallo en la conexión con la BD";
      } else {
        res.send(result);
      }
    });
};

//  POST
module.exports.users_create = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (db.get() === null) {
    next(new Error("La conexión no está establecida"));
    return;
  }
  const user = {};
  user.name = req.body.name;
  user.surname = req.body.surname;
  user.age = req.body.age;
  user.dni = req.body.dni;
  user.birthday = req.body.birthday;
  user.favouriteColour = req.body.favouriteColour;
  user.gender = req.body.gender;
  user.notes = req.body.notes;
  db.get()
    .db("apidb")
    .collection("users")
    .insertOne(user, function (err, result) {
      if (err) {
        throw "Fallo en la conexión con la BD";
      } else {
        res.send(result.ops[0]);
      }
    });
};

// PUT
module.exports.users_update_one = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (db.get() === null) {
    next(new Error("La conexión no está establecida"));
    return;
  }
  const filter = { _id: new mongodb.ObjectID(req.params.id) };
  const update = {
    $set: {
      name: req.body.name,
      surname: req.body.surname,
      age: req.body.age,
      dni: req.body.dni,
      birthday: req.body.birthday,
      favouriteColour: req.body.favouriteColour,
      gender: req.body.gender,
      notes: req.body.notes,
    },
  };
  db.get()
    .db("apidb")
    .collection("users")
    .updateOne(filter, update, function (err, result) {
      if (err) {
        next(new Error("Fallo en la conexión con la BD"));
        return;
      } else {
        res.send(result);
      }
    });
};

// DELETE
module.exports.users_delete_one = function (req, res, next) {
  if (db.get() === null) {
    next(new Error("La conexión no está establecida"));
    return;
  }
  const filter = { _id: new mongodb.ObjectID(req.params.id) };
  db.get()
    .db("apidb")
    .collection("users")
    .deleteOne(filter, function (err, result) {
      if (err) {
        next(new Error("Fallo en la conexión con la BD"));
        return;
      } else {
        res.send(result);
      }
    });
};
