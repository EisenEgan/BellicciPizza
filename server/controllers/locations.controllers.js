var mongoose = require('mongoose')
var Location = mongoose.model('Location')
var config = require('../../config')

// name: type: String,required: true
// address: {type: String,required: true},
// coordinates: {type: [Number],required: true},
// hours: {type: [OpeningTimeSchema],required: true},
// wifi: {type: Boolean},
// menu: {type: MenuSchema}

// days: {type: String,required: true},
// opening: String,
// closing: String,
// closed: {type: Boolean,required: true}

module.exports.addLocation = function(req, res) {
  const street = req.body.street
  const city = req.body.city
  const state = req.body.state
  const zip = req.body.zip
  const slug = city.replace(/\./, "").replace(/\s/g, '-').toLowerCase()

  const lat = req.body.lat
  const lng = req.body.lng
  const coordinates = [parseFloat(lat), parseFloat(lng)]
  const hours =
  [
    {
      days: 'Monday-Friday',
      opening: "10:00",
      closing: "10:00",
      closed: false
    },
    {
      days: 'Saturday',
      opening: "10:00",
      closing: "12:00",
      closed: false
    },
    {
      days: 'Sunday',
      closed: true
    }
  ]
  const wifi = (req.body.wifi == 'true')
  Location.create({
    street: street,
    city: city,
    state: state,
    zip: zip,
    slug: slug,
    coordinates: coordinates,
    hours: hours,
    wifi: wifi
  }, (err, location) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(201).json(location)
    }
  })
}

module.exports.getLocation = function(req, res) {
  console.log('herp')
  var city = req.params.location
  // var city = req.params.location.replace(/-/, " ").toLowerCase()
  // city = city.indexOf('st') != -1 ? city.replace(/st/, 'st.') : city
  // console.log(city)
  // res.status(200).json({success: true})
  Location.find({"slug": city}).exec((err, location) => {
    var categoryNameHolder = []
    var categoryArr = []

    location[0].items.forEach(function(item) {
      categoryNameHolder[item.category.name] = categoryNameHolder[item.category.name] || {}
      var obj = categoryNameHolder[item.category.name]
      if (Object.keys(obj).length == 0)
        categoryArr.push(obj)
      obj.categoryName = item.category.name
      obj.items = obj.items || []
      obj.items.push(item)
    })

    // var locationAndSortedItems = {
    //   location: location[0],
    //   sortedItems: groupedItems
    // }

    var locationAndSortedItems = {
      location: location[0],
      sortedItems: categoryArr
    }

    if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(locationAndSortedItems)
    }
  })
}
