const mongoose = require('mongoose');

const Item = require('./item.js')
const ItemSchema = mongoose.model('Item').schema

const OrderSchema = mongoose.Schema({
  items: {
    type: [ItemSchema],
    required: true
  },
  timePlaced: {
    type: Date,
    "default": Date.now
  },
  paid: {
    type: Boolean,
    "default": false
  }
});

module.exports = mongoose.model('Order', OrderSchema);
