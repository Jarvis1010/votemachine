var hotelData=require('../data/hotel-data.json');
module.exports.hotelsGetAll = function(req, res){
    res.json(hotelData);
};