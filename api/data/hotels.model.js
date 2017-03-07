var mongoose=require('mongoose');

var reviewSchema=new mongoose.Schema({
    name:{type:String,required:true},
    review:{type:String,required:true},
    rating:{type:Number,required:true,min:0,max:5},
    createdOn:{type:Date,default:Date.now}
});

var roomSchema=new mongoose.Schema({
    type:{type:String},
    number:{type:Number},
    description:{type:String},
    photos:[{type:String}],
    price:{type:Number}
});



var hotelSchema = new mongoose.Schema({
    name:{type:String,required:true},
    stars:{type:Number,min:0,max:5,default:0},
    services:[String],
    description:{type:String},
    photos:[String],
    currency:{type:String},
    reviews:[reviewSchema],
    rooms:[roomSchema],
    //Longitude is always first
    location:{address:String,coordinates:{type:[Number],index:'2dsphere'}}
});


mongoose.model('Hotel',hotelSchema,'hotels');