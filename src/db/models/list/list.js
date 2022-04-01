const mongoose = require('mongoose');
const { Schema } = mongoose;

const appointScheme = new Schema({
  user_id: String,
  name: String,
  doctor: String,
  date: Date,
  complaints: String,
});

module.exports = Appoint = mongoose.model('appoints', appointScheme);
