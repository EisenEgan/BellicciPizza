const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
  address: {
    type: String
  },
  city: {
    type: String
  },
  zip: {
    type: Number
  }
});

module.exports = mongoose.model('Address', AddressSchema);
