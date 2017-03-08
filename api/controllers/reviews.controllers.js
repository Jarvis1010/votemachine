var mongoose=require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.reviewsGetAll = function(req, res){
    var hotelID = req.params.hotelId;
    
    Hotel
    .findById(hotelID)
    .select('reviews')
    .exec(function(err,docs){
        var response = {status:200,"message":[]};
        if(err){
            response.status=500;
            response.message=err;
        }else if(!docs){
            response.status=404;
            response.message="Hotel ID not found";
        }else{
            response.message=docs.reviews||[];
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

var addReview=function(req,res,hotel){
    hotel.reviews.push({
        name:req.body.name,
        rating:parseInt(req.body.rating,10),
        review:req.body.review
    });
    
    hotel.save(function(err,hotelUpdated){
        if(err){
            res.status(500).json(err);
        }else{
            res.status(201).json(hotelUpdated.reviews[hotelUpdated.reviews.length-1]);
        }
    });
};

module.exports.reviewsAddOne = function(req, res){
   
   var hotelID = req.params.hotelId;
    
    Hotel
    .findById(hotelID)
    .select('reviews')
    .exec(function(err,docs){
        var response = {status:200,"message":[]};
        if(err){
            response.status=500;
            response.message=err;
        }else if(!docs){
            response.status=404;
            response.message="Hotel ID not found";
        }else 
        if(docs){
            addReview(req,res,docs);
        }else{    
            res.status(response.status).json(response.message);
        }
    }); 
   
};