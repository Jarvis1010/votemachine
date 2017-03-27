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
                        res.json({creator:req.user,pollTitles:pollTitles});
                    }else{
                        res.status(500).json(err);
                    }
                });
         
};

module.exports.pollsGetPopular = function(req, res){
        
        Poll.aggregate([
                    {$project: {title:"$title",creator:"$creator",totalOptionCount: { $sum: "$options.count"}}},
                     { $sort : { totalOptionCount : -1 }},
                     { $limit : 8 }
                   ],function(err,polls){
                    if(!err){
                        res.json(polls);
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


module.exports.pollUpdateOne = function(req, res){
    
    
    Poll
    .findById(req.body._id)
    .exec(function(err,doc){
        var response = {status:200,"message":doc};
        if(err){
            response.status=500;
            response.message=err;
        }else if(!doc){
            response.status=404;
            response.message="Poll ID not found";
        }
        if(response.status!=200){
           res.status(response.status).json(response.message); 
        }else{    
            
            doc.creator=req.body.creator;
            doc.title=req.body.title;
            doc.options=req.body.options;
            
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

module.exports.pollUpdate = function(req, res){
    
    
    Poll
    .findById(req.body._id)
    .exec(function(err,doc){
        var response = {status:200,"message":doc};
        if(err){
            response.status=500;
            response.message=err;
        }else if(!doc){
            response.status=404;
            response.message="Poll ID not found";
        }else if(doc.creator!=req.user){
            response.status=401;
            response.message="Invalid Authorization";
        }
        
        if(response.status!=200){
           res.status(response.status).json(response.message); 
        }else{    
            
            doc.creator=req.body.creator;
            doc.title=req.body.title;
            doc.options=req.body.options;
            
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


module.exports.pollsDeleteOne = function(req, res){
    
    var query = {title:req.params.title,creator:req.user};
    console.log(query);
    Poll.find(query)
        .remove()
        .exec(function(err,poll){
            if(err){
                res.status(404).json(err);
            }else{
              
                res.status(204).json();
            }
        });
};
