const mongoose = require('mongoose')
const Category = mongoose.model('Category')
const Location = mongoose.model('Location')
const Item = mongoose.model('Item')

// make sure name and size are unique
module.exports.addItem = function(req, res) {
  var name = req.body.name
  var price = parseFloat(req.body.price)
  var calories = parseInt(req.body.calories)
  var size = req.body.size
  var categoryName = req.body.category
  var locationName = req.body.location

  Category.findOne({"name": categoryName}).exec((err, category) => {
    if (err) {
      res.status(500).json(err)
    } else {
      item = {
        category: category,
        name: name,
        price: price,
        calories: calories,
        size: size
        // location: locationName
      }
      if (locationName == 'All') {
        Location.update({}, {
          $push : { 'items' : item }
        }, {
          multi : true
        }, (err, locations) => {
          if (err) {
            res.status(500).json(err)
          } else {
            res.status(201).json({success: true, item: item})
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
              console.log({success: true, item: item})
              res.status(201).json({success: true, item: item})
            }
          }
        )
      }
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

module.exports.deleteItem = function(req, res) {
  const deleteLocation = req.body.location;
  const itemId = req.body._id

  if ("all" || deleteLocation == "All") {
    Location.find().exec((err, locations) => {
      if (err) {
        res.status(500).json(err)
      } else {
        for (var location of locations) {
          location.items.splice(location.items.findIndex(i => (i._id == itemId)), 1 )
          location.save()
        }
        res.status(201).json({success: true })
        // locations.save(function(err, deleted) {
        //   if (err) {
        //     res.status(500).json(err)
        //   } else {
        //     res.status(201).json({success: true })
        //   }
        // })
      }
    })
  } else {
    Location.find({"city": deleteLocation}).exec((err, location) => {
      if (err) {
        res.status(500).json(err)
      } else {
        console.log("location = " + location)
        console.log('items')
        console.log(location[0].items)
        location[0].items.splice(location[0].items.findIndex(i => (i._id == itemId)), 1 )
        location[0].save(function(err, deleted) {
          if (err) {
            res.status(500).json(err)
          } else {
            res.status(201).json({success: true })
          }
        })
      }
    })
  }
}

module.exports.editItem = function(req, res) {
  const editLocation = req.body.location;
  const itemId = req.body._id;

  if (editLocation == "All") {
    Location.find().exec((err, locations) => {
      if (err) {
        res.status(500).json(err)
      } else {
        delete req.body.location
        for (var location of locations) {
          location.items.splice(location.items.findIndex(i => (i._id == itemId)), 1, req.body)
          location.save()
        }
        res.status(201).json({success: true })
      }
    })
  } else {
    Location.find({"city": editLocation}).exec((err, location) => {
      if (err) {
        res.status(500).json(err)
      } else {
        delete req.body.location
        location[0].items.splice(location[0].items.findIndex(i => (i._id == itemId)), 1, req.body)
        location[0].save(function(err, deleted) {
          if (err) {
            res.status(500).json(err)
          } else {
            res.status(201).json({success: true })
          }
        })
      }
    })
  }
}
