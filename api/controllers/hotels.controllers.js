var mongoose=require('mongoose');
var Hotel = mongoose.model('Hotel');
var ObjectId = require('mongodb').ObjectId;


module.exports.hotelsGetAll = function(req, res){
    
    var offset =parseInt(req.query.offset)||0;
    var count = parseInt(req.query.count)||5;
    
    Hotel.find()
            .skip(offset)
            .limit(count)
            .exec(function(err,hotels){
                if(!err){
                    console.log("Found "+hotels.length+" hotels");
                    res.json(hotels);
                }
            });
};

module.exports.hotelsGetOne = function(req, res){
   
    
    var hotelID = req.params.hotelId;
    
    Hotel
    .findById(hotelID)
    .exec(function(err,docs){
        if(!err){
            res.json(docs);
        }
    });
    
    
};

module.exports.hotelsAddOne = function(req, res){
    
    var newHotel;
    
    if(req.body&&req.body.name&&req.body.stars){
        newHotel = req.body;
        newHotel.stars=parseInt(newHotel.stars,10);
        
        /*
        collection.insertOne(newHotel,function(err,response){
            if(!err){
                res.status(201).json(response.ops);
            }
        });
        */
    }else{
        res.status(400).json({message:"Required data missing from body"});
    }
};
