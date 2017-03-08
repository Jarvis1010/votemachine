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

var splitArray = function(input){
    var output;
    if(input&&input.length>0){
        output=input.split(";");
    }else{
        output=[];
    }
    return output;
};

module.exports.hotelsAddOne = function(req, res){
    
   Hotel
    .create({
       name:req.body.name,
       description:req.body.description,
       stars:parseInt(req.body.stars),
       services:splitArray(req.body.services),
       photos:splitArray(req.body.photos),
       currency:req.body.currency,
       location:{
           address:req.body.address,
           coordinates:[parseFloat(req.body.lng),parseFloat(req.body.lat)]
       }
    },
    function(err,hotel){
        if(err){
            console.log("error writing to database", err);
            res.status(400).json(err)
        }else{
            res.status(201).json(hotel)
        }
    });
   
};

module.exports.hotelsUpdateOne = function(req, res){
    var hotelID = req.params.hotelId;
    
    Hotel
    .findById(hotelID)
    .select("-reviews -rooms")
    .exec(function(err,doc){
        var response = {status:200,"message":doc};
        if(err){
            response.status=500;
            response.message=err;
        }else if(!doc){
            response.status=404;
            response.message="Hotel ID not found";
        }
        if(response.status!=200){
           res.status(response.status).json(response.message); 
        }else{    
            doc.name=req.body.name;
            doc.description=req.body.description;
            doc.stars=parseInt(req.body.stars);
            doc.services=splitArray(req.body.services);
            doc.photos=splitArray(req.body.photos);
            doc.currency=req.body.currency;
            doc.location={
                address:req.body.address,
                coordinates:[parseFloat(req.body.lng),parseFloat(req.body.lat)]
            };
            
            doc.save(function(err,hotelUpdated){
                if(err){
                   res.status(500).json(err); 
                }else{
                    res.status(204).json();
                }
            });
        }    
        
    });
};

module.exports.hotelsDeleteOne = function(req, res){
    var hotelID = req.params.hotelId;
    
    Hotel.findByIdAndRemove(hotelID)
        .exec(function(err,hotel){
            if(err){
                res.status(404).json(err);
            }else{
                res.status(204).json();
            }
        });
};