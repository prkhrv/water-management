var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

//PORT
var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CORS
app.use(cors());


//Data Base
//DataBase
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
const dbConfig = require('./config/database.config.js');
// Connecting to the database 
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


//Schema
var users = require('./api/models/users/usersModel');



app.get('/',function(req,res,next){
    res.json({message:"working"});
})
const routes = require('./api/routes/router');
app.use('/',routes);










app.listen(port,function(err){
    console.log(`SERVER RUNNING ON ${port}`);
});
