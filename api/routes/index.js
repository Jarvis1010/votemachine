var express = require('express');
var router = express.Router();

var ctrHotels=require('../controllers/hotels.controllers.js');
var ctrReviews=require('../controllers/reviews.controllers.js');

//hotel routes
router
.route('/hotels')
.get(ctrHotels.hotelsGetAll)
.post(ctrHotels.hotelsAddOne);

router
.route('/hotels/:hotelId')
.get(ctrHotels.hotelsGetOne)
.put(ctrHotels.hotelsUpdateOne)
.delete(ctrHotels.hotelsDeleteOne);

//reviews routes
router
.route('/hotels/:hotelId/reviews')
.get(ctrReviews.reviewsGetAll)
.post(ctrReviews.reviewsAddOne);

router
.route('/hotels/:hotelId/reviews/:reviewId')
.get(ctrReviews.reviewsGetOne)
.put(ctrReviews.reviewsUpdateOne)
.delete(ctrReviews.reviewsDeleteOne);

module.exports = router;
