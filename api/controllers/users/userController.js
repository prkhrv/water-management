'use strict';
var mongoose = require('mongoose');
var users = mongoose.model('mineral_water_users');

// JWT
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
// var config = require('../../config/config');


//Create Users
exports.create_a_user = function(req,res,next){
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    users.create({
        user_name:req.body.user_name,
        password:hashedPassword,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone
    },function(err,users){
        if(err){
            res.send(err);
        }else{
            res.json({task:true,message:"user created"});
        }
    });
};

//Login
exports.login_a_user = function(req,res,next){
    if(req.body.user_name.length > 0 && req.body.password.length > 0){
        users.findOne({user_name:req.body.user_name}).exec(function(err,user){
            if(!user){
                res.send("Noob");
            }else if(user){
                var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                if(passwordIsValid){
                    res.json({auth:true,message:"Logged in"});
                }else{
                    res.json({auth:false,message:"NOT Logged in"});
                }
            }
        });
    }else{
        res.json({auth:false,message:"NOT Logged in"});
    }
};


