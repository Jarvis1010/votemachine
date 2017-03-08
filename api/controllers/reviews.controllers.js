var mongoose=require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.reviewsGetAll = function(req, res){
    var hotelID = req.params.hotelId;
    
    Hotel
    .findById(hotelID)
    .select('reviews')
    .exec(function(err,docs){
        var response = {status:200,"message":docs.reviews};
        if(err){
            response.status=500;
            response.message=err;
        }else if(!docs){
            response.status=404;
            response.message="Hotel ID not found";
        }
            
        res.status(response.status).json(response.message);
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

