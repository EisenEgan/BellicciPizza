var mongoose = require('mongoose')
var Category = mongoose.model('Category')
var Location = mongoose.model('Location')

module.exports.getAdminInfo = function(req, res) {
  Category.find().exec((err, categories) => {
    if (err) {
      res.status(500).json(err)
    } else {
      Location.find().exec((err, locations) => {
        if (err) {
          res.status(500).json(err)
        } else {
          var items = []
          var locationNames = []
          for (var location of locations) {
            locationNames.push(location.city)
            for (var item of location.items) {
              if (items.findIndex(i => (i.name == item.name && i.size == item.size)) != -1) {
                items[items.findIndex(i => (i.name == item.name && i.size == item.size))].location = 'All'
              } else {
                item.location = location.city
                items.push(item)
              }
            }
          }
          // var reducedItems = items.sort(function(a, b) {
          //   var catA = a.category.name.toUpperCase()
          //   var catB = b.category.name.toUpperCase()
          //   if (catA < catB) {
          //     return -1;
          //   }
          //   if (catA > catB) {
          //     return 1;
          //   }
          //   return 0;
          // }).reduce(function(acc, item) {
          //   if (acc.length) {
          //     if (acc[acc.length - 1][0].name.category = item.category) {
          //       acc[acc.length-1].push(item)
          //     } else {
          //       acc.push([item])
          //     }
          //   } else {
          //     acc.push([item])
          //   }
          // }, [])
          var categoryNameHolder = []
          var categoryArr = []
          items.forEach(function(item) {
            categoryNameHolder[item.category.name] = categoryNameHolder[item.category.name] || {}
            var obj = categoryNameHolder[item.category.name]
            if (Object.keys(obj).length == 0)
              categoryArr.push(obj)
            obj.categoryName = item.category.name
            obj.items = obj.items || []
            obj.items.push(item)
          })
          // var groupedItems = items.reduce(function(arr, item) {
          //   arr.findIndex(i => (i.category.name == i.category.name))
          //   obj[item.category.name] = obj[item.category.name] || []
          //   obj[item.category.name].push(item)
          //   return obj;
          // }, [])
          // var result = Object.keys(groupedItems).map(function(key) {
          //   return groupedItems[key];
          // });
          locationNames.push('All')
          var categoriesAndGroupedItems = {
            locations: locationNames,
            categories: categories,
            items: categoryArr
          }
          // console.log(categoriesAndLocations)
          res.status(200).json(categoriesAndGroupedItems)
        }
      })
      //res.status(200).json(categories)
    }
  })
}
