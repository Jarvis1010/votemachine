var mongoose=require('mongoose');
var Poll = mongoose.model('Poll');
var ObjectId = require('mongodb').ObjectId;



module.exports.pollsAddOne = function(req, res){
    var options=req.body.options.map(function(a){return {option:a,count:0};});
    console.log(req.user);
   Poll
    .create({
       creator:req.user,
       title:req.body.title,
       options:options
    },
    function(err,poll){
        if(err){
            console.log("error writing to database", err);
            res.status(400).json(err)
        }else{
            res.status(201).json(poll)
        }
    });
   
};



/*
module.exports.pollsGetAll = function(req, res){
    
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

module.exports.pollsGetOne = function(req, res){
   
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
*/