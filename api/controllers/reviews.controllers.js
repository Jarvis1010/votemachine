var mongoose=require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.reviewsGetAll = function(req, res){
    var hotelID = req.params.hotelId;
    
    Hotel
    .findById(hotelID)
    .select('reviews')
    .exec(function(err,docs){
        if(!err){
            res.json(docs.reviews);
        }
    });    
};
    
module.exports.reviewsGetOne = function(req, res){
    var hotelID = req.params.hotelId;
    var reviewID = req.params.reviewId;
    
    Hotel
    .findById(hotelID)
    .select('reviews')
    .exec(function(err,hotel){
        if(!err){
            var review=hotel.reviews.id(reviewID);
            res.json(review);
        }
    });
};  

