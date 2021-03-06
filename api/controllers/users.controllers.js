var mongoose=require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.register=function(req,res){
    console.log("Registering User");
    var username =req.body.username;
    var name =req.body.name||null;
    var password=req.body.password;
    
    User.create({username:username, 
        name:name,
        password:bcrypt.hashSync(password,bcrypt.genSaltSync(10))},function(err,user){
        if(err){
            console.log(err);
        }else{
            console.log(user);
            res.status(201).json(user);
        }
    });
};

module.exports.login=function(req,res){
    var username =req.body.username;
    var password=req.body.password;
    
    User.findOne({username:username})
        .exec(function(err,user){
            if(err||user==null){
                res.status(400).json(err);
            }else{
                if(bcrypt.compareSync(password,user.password)){
                    var token=jwt.sign({username:user.username},'s3cr3t',{expiresIn:3600});
                    res.status(200).json({success:true,token:token});
                }else{
                    res.status(401).json("Unauthorized");
                }
            }
    });
};

module.exports.authenticate=function(req,res,next){
    var headerExists = req.headers.authorization;
    if(headerExists){
        var token=req.headers.authorization.split(' ')[1];
        jwt.verify(token,'s3cr3t',function(error, decoded){
            if(error){
                console.log(error);
                res.status(401).json("Unauthorized");
            }else{
                req.user=decoded.username;
                next();
            }
        });
    }else{
        res.status(403).json("no token provided")
    }
};