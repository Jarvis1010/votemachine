var express = require('express');
var router = express.Router();

var ctrHotels=require('../controllers/hotels.controllers.js');

router
.route('/hotels')
.get(ctrHotels.hotelsGetAll);

router
.route('/hotels/:hotelId')
.get(ctrHotels.hotelsGetOne);

module.exports = router;