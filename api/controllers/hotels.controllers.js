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
        }else{
            res.status(500).json(err);
        }
    });
};

module.exports.hotelsGetAll = function(req, res){
    
    var offset =parseInt(req.query.offset)||0;
    var count = parseInt(req.query.count)||5;
    var maxCount=10;
    
    if(req.query&&req.query.lat&&req.query.lng){
        if(isNaN(req.query.lat)||isNaN(req.query.lng)){
            res.status(400).json({"message":"Incorrect Coordinates"});
            return; 
        }
        runGeoQuery(req,res);
    }else{
        if(count>maxCount){
            res.status(400).json({"message":"Limit of "+maxCount+" exceeded"});
            return;
        }
        Hotel.find()
                .skip(offset)
                .limit(count)
                .exec(function(err,hotels){
                    if(!err){
                        console.log("Found "+hotels.length+" hotels");
                        res.json(hotels);
                    }else{
                        res.status(500).json(err);
                    }
                });
    }        
};

module.exports.hotelsGetOne = function(req, res){
   
    
    var hotelID = req.params.hotelId;
    
    Hotel
    .findById(hotelID)
    .exec(function(err,doc){
        var response = {status:200,"message":doc};
        if(err){
            response.status=500;
            response.message=err;
        }else if(!doc){
            response.status=404;
            response.message="Hotel ID not found";
        }
            
        res.status(response.status).json(response.message);
            
        
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
