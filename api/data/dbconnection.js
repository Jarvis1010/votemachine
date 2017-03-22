var MongoClient=require('mongodb').MongoClient;

var dburl=process.env.MONGOLAB_URI;

var _connection=null;

var open = function(){
    MongoClient.connect(dburl,function(err,db){
        if(err){
            console.log("DB connection failed");
            return;
        }else{
            _connection=db;
            console.log('DB connection open');
        }
    });
};

var get = function(){
    return _connection;
};

module.exports={
    open:open,
    get:get
};