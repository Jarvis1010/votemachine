var mongoose=require('mongoose');

var hotelSchema = new mongoose.Schema({
    name:{type:String,required:true},
    stars:{type:Number,min:0,max:5,default:0},
    services:[{type:String}],
    description:{type:String},
    photos:[{type:String}],
    currency:{type:String}
});

mongoose.model('Hotel',hotelSchema,'hotels');