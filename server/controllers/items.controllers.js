const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const Location = mongoose.model('Location')
const Item = mongoose.model('Item')

module.exports.addItem = function(req, res) {
  var name = req.body.name
  var price = parseFloat(req.body.price)
  var calories = parseInt(req.body.calories)
  var size = req.body.size
  var categoryName = req.body.categoryName
  var locationName = req.body.locationName

  Category.findOne({"name": categoryName}).exec((err, category) => {
    if (err) {
      res.status(500).json(err)
    } else {
      Item.create({
        category: category,
        name: name,
        price: price,
        calories: calories,
        size: size
      }, (err, item) => {
        if (locationName == 'all') {
          Location.update({}, {
            $push : { 'items' : item }
          }, {
            multi : true
          }, (err, locations) => {
            if (err) {
              res.status(500).json(err)
            } else {
              res.status(204).json({success: true})
            }
          });
        } else {
          Location.findOneAndUpdate(
            {'city': locationName},
            {$push : {'items': item}},
            {'new': true}, (err, location) => {
              if (err) {
                res.status(500).json(err)
              } else {
                res.status(204).json(location)
              }
            }
          )
        }
      })
    }
  })
}

module.exports.getItems = function(req, res) {
  Location.find().exec((err, locations) => {

    if (err) {
      res.status(500).json(err)
    } else {
      var items = []
      for (var location of locations) {
        for (var item of location.items) {
          if (items.findIndex(i => (i.name == item.name && i.size == item.size)) != -1) {
            console.log('item = ' + item.name)
            items[items.findIndex(i => (i.name == item.name && i.size == item.size))].location = 'all'
          } else {
            item.location = location.city
            items.push(item)
          }
        }
      }
      console.log(items)
      // console.log(items)
      // var reducedItems = items.reduce(function (allItems, item) {
      //   console.log('item=', item)
      //   console.log(allItems.findIndex(i => i.name == item.name)
      //   if (allItems.findIndex(i => i.name == item.name) != -1) {
      //     allItems[allItems.findIndex(i => i.name == item.name)].location = 'all'
      //   } else {
      //     allItems.push(item)
      //   }
      //   return allItems;
      // }, []);
      // console.log(reducedItems)

      res.status(200).json({success: true})
      // var dups = [];
      // var arr = items.filter(function(el) {
      //   // If it is not a duplicate, return true
      //   if (dups.indexOf(el.ID) == -1) {
      //     dups.push(el.ID);
      //     return true;
      //   }
      //
      //   return false;
      //
      // });

      // res.status(200).json(locations)
    }
  })
}
