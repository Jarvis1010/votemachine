var mongoose=require('mongoose');
var Hotel = mongoose.model('Hotel');
var ObjectId = require('mongodb').ObjectId;

var runGeoQuery=function(req,res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    
    var point={type:"Point",coordinates:[lng,lat]};
    var geoOptions = {spherical:true, maxDistance:2000,num:5};
    
    Hotel.geoNear(point,geoOptions,function(err,results,stats){
        if(!err){
            res.json(results);
        }
    });
};

module.exports.hotelsGetAll = function(req, res){
    
    var offset =parseInt(req.query.offset)||0;
    var count = parseInt(req.query.count)||5;
    
    if(req.query&&req.query.lat&&req.query.lng){
        runGeoQuery(req,res);
        
    }else{
        Hotel.find()
                .skip(offset)
                .limit(count)
                .exec(function(err,hotels){
                    if(!err){
                        console.log("Found "+hotels.length+" hotels");
                        res.json(hotels);
                    }
                });
    }        
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
