var mongoose = require('mongoose')
var User = mongoose.model('User')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')
var config = require('../../config')

module.exports.authenticate = function(req, res, next) {
  var headerExists = req.headers.authorization
  if (headerExists) {
    var token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, config.secret, function(error, decoded) {
      if (error) {
        console.log(error)
        res.status(401).json('Unauthorized')
      } else {
        req.user = decoded.username
        next()
      }
    })
  } else {
    res.status(403).json('No token provided')
  }
}

module.exports.login = function(req, res) {
  var username = req.body.username
  var password = req.body.password
  User.findOne({
    username: username
  }).exec(function(err, user) {
    if (err) {
      console.log(err)
      res.status(400).json(err)
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        var token = jwt.sign({ username: user.username }, config.secret)
        res.status(200).json({success: true, token: token, user: user.username})
      } else {
        res.status(401).json('Unauthorized')
      }
    }
  })
}

// module.exports.addUser = function(req, res) {
//   var username = req.body.username;
//   var password = req.body.password;
//
//   User.create({
//     username: username,
//     password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//   }, function(err, user) {
//     if (err) {
//       console.log(err)
//       res.status(400).json(err)
//     } else {
//       console.log('user created', user)
//       // var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 })
//       res.status(201).json({success: true})
//     }
//   })
// }
