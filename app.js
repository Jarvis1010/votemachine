var express = require('express');
var app = express();
var path = require('path');
var bodyParser =require('body-parser');

var routes = require("./api/routes");

var port = process.env.PORT || 8080;

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({extended:false}));

app.use('/api',routes);

var server =app.listen(port,function(){
    var portNum =server.address().port;
    console.log("server is running on "+portNum);
});

