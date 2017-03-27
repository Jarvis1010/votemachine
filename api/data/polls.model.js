var mongoose=require('mongoose');

var optionSchema=new mongoose.Schema({
    option:{type:String,required:true},
    count:{type:Number,required:true}
});

var pollSchema = new mongoose.Schema({
    creator:{type:String,required:true},
    title:{type:String,required:true,unique:true},
    options:[optionSchema]
});


mongoose.model('Poll',pollSchema,'polls');