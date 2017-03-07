var express = require('express');
var router = express.Router();

var ctrHotels=require('../controllers/hotels.controllers.js');
var ctrReviews=require('../controllers/reviews.controllers.js');

//hotel routes
router
.route('/hotels')
.get(ctrHotels.hotelsGetAll);

router
.route('/hotels/:hotelId')
.get(ctrHotels.hotelsGetOne);

router
.route('/hotels/new')
.post(ctrHotels.hotelsAddOne);

//reviews routes
router
.route('/hotels/:hotelId/reviews')
.get(ctrReviews.reviewsGetAll);

router
.route('/hotels/:hotelId/reviews/:reviewId')
.get(ctrReviews.reviewsGetOne);

module.exports = router;
