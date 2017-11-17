var express = require('express')
var router = express.Router()

var ctrlUsers = require('../controllers/users.controllers')
var ctrlCategories = require('../controllers/categories.controllers')
var ctrlLocations = require('../controllers/locations.controllers')
var ctrlItems = require('../controllers/items.controllers')
var ctrlOrders = require('../controllers/orders.controllers')
var ctrlAdmin = require('../controllers/admin.controllers')

router.post('/login', ctrlUsers.login)

router
  .route('/locations')
  .post(ctrlLocations.addLocation)

router
  .route('/admin')
  .get(/*ctrlUsers.authenticate,*/ ctrlAdmin.getAdminInfo)

router
  .route('/locations/:location')
  .get(ctrlLocations.getLocation)

router
  .route('/items')
  .get(ctrlItems.getItems)
  .post(/*ctrlUsers.authenticate,*/ ctrlItems.addItem)
  .put(ctrlItems.editItem)
  .delete(ctrlItems.deleteItem)

router
  .route('/category')
  .get(ctrlUsers.authenticate, ctrlCategories.getCategories)
  .post(/*ctrlUsers.authenticate,*/ ctrlCategories.addCategory)
  .put(/*ctrlUsers.authenticate,*/ ctrlCategories.editCategory)
  .delete(/*ctrlUsers.authenticate,*/ ctrlCategories.deleteCategory)

router
  .route('/order')
  .get(ctrlOrders.getOrders)
  .post(ctrlOrders.addOrder)



// router.post('/add', ctrlUsers.addUser);

module.exports = router;
