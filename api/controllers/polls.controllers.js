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


module.exports.pollsGetAll = function(req, res){
    
        Poll.find({creator:req.user})
                .exec(function(err,polls){
                    if(!err){
                        console.log("Found "+polls.length+" polls");
                        var pollTitles=polls.map(function(a){return a.title;});
                        res.json({creator:polls[0].creator,pollTitles:pollTitles});
                    }else{
                        res.status(500).json(err);
                    }
                });
         
};


module.exports.pollsGetOne = function(req, res){
   
    var creator = req.params.creator;
    var title =req.params.title;
    
    Poll
    .findOne({creator:creator,title:title})
    .exec(function(err,doc){
        var response = {status:200,"message":doc};
        if(err){
            response.status=500;
            response.message=err;
        }else if(!doc){
            response.status=404;
            response.message="Poll not found";
        }
            
        res.status(response.status).json(response.message);
            
        
    });
    
    
};

/*
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