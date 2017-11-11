const mongoose = require('mongoose');

const OpeningTime = require('./openingTime.js')
const OpeningTimeSchema = mongoose.model('OpeningTime').schema

const Item = require('./item.js')
const ItemSchema = mongoose.model('Item').schema

const LocationSchema = mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  hours: {
    type: [OpeningTimeSchema],
    // required: true
  },
  wifi: {
    type: Boolean,
    required: true
  },
  items: {
    type: [ItemSchema]
  }
});

// Note: Virtuals aren't able to be queried
// LocationSchema.virtual('slug').get(function() {
//     return this.city.replace(/\./, "").replace('\s', '-').toLowerCase();
// });

module.exports = mongoose.model('Location', LocationSchema);
