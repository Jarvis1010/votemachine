var dbconn = require('../data/dbconnection.js');
var hotelData=require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res){
    var db = dbconn.get();
    var offset =parseInt(req.query.offset)||0;
    var count = parseInt(req.query.count)||5;
    console.log(offset,count);
    
    var returnData = hotelData.slice(offset,offset+count);
    
    res.json(returnData);
};

module.exports.hotelsGetOne = function(req, res){
    var hotelID = req.params.hotelId;
    var thisHotel = hotelData[hotelID];
    res.json(thisHotel);
};

module.exports.hotelsAddOne = function(req, res){
    res.json(req.body);
};
