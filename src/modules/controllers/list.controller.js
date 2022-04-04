const Appoint = require('../../db/models/list/list');
const jwt = require('jsonwebtoken');

module.exports.createAppoint = (req, res) => {
  const body = req.body;
  const { token, name, doctor, date, complaints } = body;
  res.set('Access-Control-Allow-Origin', '*');
  const appoint = new Appoint({
    user_id: jwt.decode(token, 'jwt-secret-key').id,
    name: name,
    doctor: doctor,
    date: date,
    complaints: complaints,
  });
  appoint.save().then((result) => {
    res.send(result);
  });
};

module.exports.allAppoints = (req, res) => {
  const token = req.query.token
  const user_id = jwt.decode(token, 'jwt-secret-key').id;
  Appoint.find({ user_id: user_id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports.updateAppoint = (req, res) => {
  const {token, name, doctor, date, complaints, _id} = req.body;
  const user_id = jwt.decode(token, 'jwt-secret-key').id;
  res.set('Access-Control-Allow-Origin', '*');
  Appoint.updateOne({_id},
    {
      $set: {
        _id,
        name,
        doctor,
        date,
        complaints
      },
    }
  ).then((result) => {
    Appoint.find({user_id}).then((result) => {
      res.send(result);
    });
  });
};

module.exports.deleteAppoint = (req, res) => {
  const id = req.query._id;
  if (id) {
    Appoint.deleteOne({ _id: id }).then((result) => {
      Appoint.find()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    });
  }
};