var dbconn = require('../data/dbconnection.js');
var ObjectId = require('mongodb').ObjectId;
var hotelData=require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res){
    var db = dbconn.get();
    var collection=db.collection('hotels');
    
    var offset =parseInt(req.query.offset)||0;
    var count = parseInt(req.query.count)||5;
    
    collection.find()
                .skip(offset)
                .limit(count)
                .toArray(function(err,docs){
        if(!err){
            res.json(docs);
        }
    });
    
};

module.exports.hotelsGetOne = function(req, res){
    var db = dbconn.get();
    var collection=db.collection('hotels');
    
    var hotelID = req.params.hotelId;
    console.log(hotelID);
    collection.findOne({_id:ObjectId(hotelID)},function(err,docs){
        if(!err){
            res.json(docs);
        }
    });
    
};

module.exports.hotelsAddOne = function(req, res){
    var db = dbconn.get();
    res.json(req.body);
};
