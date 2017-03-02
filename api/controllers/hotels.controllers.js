var hotelData=require('../data/hotel-data.json');

module.exports.hotelsGetAll = function(req, res){
    res.json(hotelData);
};

module.exports.hotelsGetOne = function(req, res){
    var hotelID = req.params.hotelId;
    var thisHotel = hotelData[hotelID];
    res.json(thisHotel);
};