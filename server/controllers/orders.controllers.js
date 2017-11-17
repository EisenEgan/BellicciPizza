var mongoose = require('mongoose')
var Order = mongoose.model('Order')

// make sure name is unique
module.exports.addOrder = function(req, res) {
  Order.create(req.body, (err, order) => {
    if (err) {
      res.status(400).json(err)
    } else {
      res.status(201).json({success: true, order: order})
    }
  })
}

module.exports.getOrders = function(req, res) {
  Order.find().exec((err, orders) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.status(200).json(orders)
    }
  })
}
