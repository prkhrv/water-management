var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//PORT
var port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());


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


const routes = require('./api/routes/router');
app.use('/',routes);






app.listen(port,function(err){
    console.log(`SERVER RUNNING ON ${port}`);
});
