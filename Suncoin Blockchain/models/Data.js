const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  voltage: Number,
  current: Number,
  power: Number,
  timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
