var express = require('express');
var app = express();
var db_handler = require('./app_modules/db_handler');

/*********** Global Settings ************/
var port = 3000;
var apiBaseUrl = '/';

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Get all products from database ********/
app.get(apiBaseUrl + 'getAllProducts/', function (req, res) {
    var returnProducts = function(arr){
        res.send(JSON.stringify(arr));
    }
    db_handler.getProducts(res);

});

/* Insert new user config on database ********/
app.post(apiBaseUrl + 'newConfig/', function (req, res) {
  res.send('POST Body: ' +  JSON.stringify(req.body));
  db_handler.insertConfig(req.body);
});


/* Console print *****************************/
app.listen(port, function () {
  console.log('Example app listening on ' + port);
});