var express = require('express')
var router = express.Router()

var ctrlUsers = require('../controllers/users.controllers')
var ctrlCategories = require('../controllers/categories.controllers')
var ctrlLocations = require('../controllers/locations.controllers')
var ctrlItems = require('../controllers/items.controllers')

router.post('/login', ctrlUsers.login)

// router
//   .route('/locations')
//   .post(ctrlLocations.addLocation)


router
  .route('/locations/:location')
  .get(ctrlLocations.getLocation)

router
  .route('/items')
  .get(ctrlItems.getItems)
  .post(ctrlUsers.authenticate, ctrlItems.addItem)

router
  .route('/category')
  .get(ctrlUsers.authenticate, ctrlCategories.getCategories)
  .post(ctrlUsers.authenticate, ctrlCategories.addCategory)



// router.post('/add', ctrlUsers.addUser);

module.exports = router;
