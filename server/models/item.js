const mongoose = require('mongoose');

const Category = require('./category.js')
const CategorySchema = mongoose.model('Category').schema

const ItemSchema = mongoose.Schema({
  category: {
    type: CategorySchema,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: String
  },
  calories: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: String,
  toppings: [this]
});

module.exports = mongoose.model('Item', ItemSchema);
