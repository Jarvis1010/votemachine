var express = require('express');
var router = express.Router();

var ctrHotels=require('../controllers/hotels.controllers.js');
var ctrReviews=require('../controllers/reviews.controllers.js');
var ctrUsers=require('../controllers/users.controllers.js');
var ctrPolls=require('../controllers/polls.controllers.js');

//poll routes
router
.route('/polls')
.get(ctrUsers.authenticate,ctrPolls.pollsGetAll)
.post(ctrUsers.authenticate,ctrPolls.pollsAddOne);

router.route('/:creator/:title')
.get(ctrPolls.pollsGetOne);

//hotel routes
router
.route('/hotels')
.get(ctrUsers.authenticate,ctrHotels.hotelsGetAll)
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

//authentication
router
.route('/users/register')
.post(ctrUsers.register);

router
.route('/users/login')
.post(ctrUsers.login);

module.exports = router;
