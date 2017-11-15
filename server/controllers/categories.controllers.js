var mongoose = require('mongoose')
var Category = mongoose.model('Category')
var Location = mongoose.model('Location')

// make sure name is unique
module.exports.addCategory = function(req, res) {
  Category.create({"name": req.body.name}, (err, category) => {
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

module.exports.deleteCategory = function(req, res) {
  var categoryName = req.body.categoryName
  Category.remove({"name": categoryName}).exec((err) => {
    if (err) {
      res.status(500).json(err)
    } else {
      Location.find().exec((err, locations) => {
        for (var location of locations) {
          var newItems = location.items.filter((item) => {
            return item.category.name != categoryName
          })
          location.items = newItems
          location.save()
        }
        res.status(200).json({"success": true})
      })
    }
  })
}

module.exports.editCategory = function(req, res) {
  var oldCategoryName = req.body.oldCategoryName
  var newCategoryName = req.body.newCategoryName

  Category.find({"name": oldCategoryName}).exec((err, category) => {
    if (err) {
      res.status(500).json(err)
    } else {
      category[0].name = newCategoryName
      category[0].save()
      Location.find().exec((err, locations) => {
        for (var location of locations) {
          for (var item of location.items) {
            if (item.category.name == oldCategoryName)
              item.category.name = newCategoryName
          }
          location.save()
        }
        res.status(200).json({"success": true})
      })
    }
  })
}
