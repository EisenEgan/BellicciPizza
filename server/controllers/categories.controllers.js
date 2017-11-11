var mongoose = require('mongoose')
var Category = mongoose.model('Category')

module.exports.addCategory = function(req, res) {
  Category.create({"name": req.body.name}, (err, category) => {
    console.log(category)
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(201).json(category)
    }
  })
}

module.exports.getCategories = function(req, res) {
  Category.find().exec((err, categories) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(categories)
    }
  })
}
