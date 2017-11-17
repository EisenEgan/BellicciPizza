const mongoose = require('mongoose');

const Item = require('./item.js')
const ItemSchema = mongoose.model('Item').schema
const AddressSchema = mongoose.model('Address').schema

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
  },
  deliveryOrPickup: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  address: AddressSchema
});

module.exports = mongoose.model('Order', OrderSchema);
