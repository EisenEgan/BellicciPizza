const mongoose = require('mongoose');

const OpeningTimeSchema = mongoose.Schema({
  days: {
    type: String,
    required: true
  },
  opening: String,
  closing: String,
  closed: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('OpeningTime', OpeningTimeSchema);
